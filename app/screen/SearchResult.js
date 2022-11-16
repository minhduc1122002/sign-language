import React, { useState, useEffect, useCallback } from 'react';
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
  const filter_instances = item.instances.filter(video => video.url.indexOf(".mp4") != -1)
  return (
    <View style={styles.container}>
      {!isReady &&
          <Text style={styles.glossStyle}>Loading ...</Text>
      }
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