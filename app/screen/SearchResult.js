import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import {Header} from 'react-native-elements';

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
  const { item, otherParam } = route.params;
  const goBack = () => {
    if(!navigation.canGoBack()) {
        return null;
    }
    return navigation.goBack()
  }
  return (
      <View>
        {/* <Header
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
        /> */}
        <Image source={require('../assets/images/cry.jpg')} style={styles.image}/>
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
});


export default SearchResult