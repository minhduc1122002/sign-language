import React, { useState, useEffect, useRef } from 'react';
import { Video, AVPlaybackStatus } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
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
  const scroll = useRef(null)
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
          <Text style={styles.glossStyle}>Loading ...</Text>
      }
    <Text style={styles.glossStyle}>{item.gloss}</Text>
    <Image style={styles.imageStyle} 
      source={{
        uri: item.image
      }} />
    <Video
      style={styles.videoStyle}
      onLoadStart={() => setReady(false)}
      source={{
        uri: item.video
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
    fontSize: 35,
    left: 200,
    bottom: 20,
    fontFamily: 'Montserrat'
  },
  imageStyle: {
    width: '100%',
    height: '70%',
    top: -20,
  },
  videoStyle: {
    top: -20,
    left: 0,
    bottom: 0,
    right: 0,
    height: 250,
  },
  backStyle: {
    top: 20,
    left: 22,
  },
  scrollContainer: {
    marginHorizontal: 20,
  },
});


export default SearchResult