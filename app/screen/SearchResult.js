import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import {Header} from 'react-native-elements';
import { Video, AVPlaybackStatus } from 'expo-av';

// import all the components we are going to use
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

function SearchResult({ route, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { item, otherParam } = route.params;
  const goBack = () => {
    if(!navigation.canGoBack()) {
        return null;
    }
    return navigation.goBack()
  }
  return (
    <View>
    <Header
      backgroundColor = '#fff'
      leftComponent={
        <TouchableOpacity
        style={{padding: 5}}
        onPress={() => goBack()}
      >
        <Image source={require('../assets/images/close.png')} style={{height: 20, width: 20}}/>
        </TouchableOpacity>
      }
      centerComponent={
        <Text style={styles.glossStyle}>{item.gloss}</Text>}
    />
    <Video
      ref={video}
      style={styles.videoStyle}
      source={{
        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
  </View>
  );
  
};

const styles = StyleSheet.create({
  glossStyle: {
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginLeft: 55,
    marginTop: 75,
  },
  videoStyle: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 250,
  },
});


export default SearchResult