import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const textureDims = Platform.OS === 'ios' ?
  {
    height: 1920,
    width: 1080,
  } :
   {
    height: 1200,
    width: 1600,
  };

let frame = 0;
const computeRecognitionEveryNFrames = 60;

const TensorCamera = cameraWithTensors(Camera);

const initialiseTensorflow = async () => {
  await tf.ready();
  tf.getBackend();
}

export default function Recognition( {navigation} ) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [detections, setDetections] = useState([]);
  const [net, setNet] = useState(null);


  const handleCameraStream = (images) => {
    const loop = async () => {
      if(net) {
        if(frame % computeRecognitionEveryNFrames === 0){
          const max = tf.scalar(255)
          let nextImageTensor = images.next().value
          nextImageTensor = tf.cast(nextImageTensor, 'float32')
          nextImageTensor = nextImageTensor.div(max)
          nextImageTensor = nextImageTensor.reshape([1, 224, 224, 3])
          if(nextImageTensor){
            const prediction = await net.predict(nextImageTensor).data();
            const clone = [...prediction]
            const result = Array.prototype.slice.call(clone.sort((a, b) => b - a).slice(0, 3))
            const detect = result.map(r => ({
              "id": prediction.indexOf(r),
              "prob": r * 100
            }))
            setDetections(detect)
            tf.dispose([nextImageTensor]);
          }
        }
        frame += 1;
        frame = frame % computeRecognitionEveryNFrames;
      }

      requestAnimationFrame(loop);
    }
    loop();
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      await initialiseTensorflow();
      const modelJson = require("../model/model.json");
      const modelWeight = require("../model/group1-shard1of1.bin");
      const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight));
      // setNet(await mobilenet.load({version: 1, alpha: 0.25}));
      setNet(model)
      // await initialiseTensorflow()
      // const modelJson = require("../model/model.json");
      // const modelWeight = require("../model/group1-shard1of1.bin");
      // const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight));


      // const image = require('../assets/images/A1.jpeg');
      // const imageAssetPath = Image.resolveAssetSource(image);
      // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      // const imageDataArrayBuffer = await response.arrayBuffer();
      // const imageData = new Uint8Array(imageDataArrayBuffer);

      // // Decode image data to a tensor
      // const max = tf.scalar(255)
      // const imageCast = tf.cast(decodeJpeg(imageData), 'float32')
      // const imageCastDiv = imageCast.div(max)
      // imageCastDiv.print()
      // const imageTensor = imageCastDiv.reshape([1, 224, 224, 3]);

      // const prediction = await model.predict(imageTensor).data()
      // console.log(prediction)

    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if(!net){
    return <Text style={{padding: 36}}>Model not loaded</Text>;
  }
  const goBack = () => {
    if(!navigation.canGoBack()) {
        return null;
    }
    return navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => goBack()}
        >
          <Ionicons name="ios-arrow-back-sharp" size={36} color="#2596be" />
        </TouchableOpacity>
      </View>
      <TensorCamera 
        style={styles.camera} 
        onReady={handleCameraStream}
        type={Camera.Constants.Type.back}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={224}
        resizeWidth={224}
        resizeDepth={3}
        autorender={true}
      />
      <View style={styles.text}>
        {detections.map((detection, index) => (
          <View key={index}>
            <Text>{detection.id} - {Math.round(detection.prob * 100) / 100}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 24,
  },
  camera: {
    flex: 1,
    width: '100%'
  },
});