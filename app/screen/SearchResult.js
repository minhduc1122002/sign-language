import React, { useState, useEffect, useCallback } from 'react';
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
  const [screenLoading, setScreenLoading] = useState(true)
  const goBack = () => {
    if(!navigation.canGoBack()) {
        return null;
    }
    return navigation.goBack()
  }
  const onLayoutRootView = useCallback(async () => {
    if (!screenLoading) {
      await SplashScreen.hideAsync();
    }
  }, [screenLoading]);

  if (screenLoading) {
    return null;
  }
  return (
    <View>
    <Text style={styles.glossStyle}>{item.gloss}</Text>
    <Video
      ref={video}
      style={styles.videoStyle}
      source={{
        url: item.instances[0].url,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
    <Video
      ref={video}
      style={styles.videoStyle}
      source={{
        url: item.instances[1].url,
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
    padding: 20,
    marginLeft: 150,
    fontFamily: 'Montserrat'
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