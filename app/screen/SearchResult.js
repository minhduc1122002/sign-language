import React, { useState, useEffect, useRef } from 'react';
import { Video, AVPlaybackStatus } from 'expo-av';
// import all the components we are going to use
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

function SearchResult({ route, navigation }) {
  const { item, otherParam } = route.params;
  const [isReady, setReady] = useState(false);
  const filter_instances = item.instances.filter(video => video.url.indexOf(".mp4") != -1);
  const goBack = () => {
    if(!navigation.canGoBack()) {
        return null;
    }
    return navigation.goBack()
  }
  return ( 
    <View style={styles.container}>
      <TouchableOpacity style={styles.backStyle} onPress={() => goBack()}>
        <Image source={require('../assets/images/close.png')} style={{height: 20, width: 20}}/>
      </TouchableOpacity>
      {!isReady &&
          <Text style={styles.glossStyle}>Loading for</Text>
      }
      <Text style={styles.glossStyle}>{item.gloss}</Text>
      <Video
        style={styles.videoStyle}
        onLoadStart={() => setReady(false)}
        source={{
          uri: filter_instances[0].url
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onReadyForDisplay={() => setReady(true)}
      />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  glossStyle: {
    fontSize: 30,
    left: 150,
    bottom: -10,
    fontFamily: 'Montserrat'
  },
  videoStyle: {
    top: 10,
    height: 250,
  },
  backStyle: {
    top: 20,
    left: 22,
  },
});


export default SearchResult