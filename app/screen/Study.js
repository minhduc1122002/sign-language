import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Alert, TouchableOpacity, Text, Animated } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  directionButton: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    aspectRatio: 1, 
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff'
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    width: 300,
    height: 30,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
  },    
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  content: {
    padding: 40, 
    alignItems: 'center',
    borderColor: '#e8e8e8',
    width: 370,
    height: 500,
    borderWidth: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

const flashcards = [
    {
        word: "apple",
        image: require("../assets/images/cry.jpg"),
        video: require("../assets/images/cry.jpg")
    },
    {
        word: "banana",
        image: require("../assets/images/cry.jpg"),
        video: require("../assets/images/cry.jpg")
    },
    {
        word: "orange",
        image: require("../assets/images/cry.jpg"),
        video: require("../assets/images/cry.jpg")
    },
    {
        word: "orange2",
        image: require("../assets/images/cry.jpg"),
        video: require("../assets/images/cry.jpg")
    }
]

function Study( {navigation} ) {
    const [flashCardIndex, setFlashCardIndex] = useState(1)
    const [progress, setProgress] = useState(new Animated.Value(1));
    let progressAnim = progress.interpolate({
        inputRange: [1, flashcards.length],
        outputRange: [100, 300]
    })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setFlashCardIndex(1);
            setProgress(new Animated.Value(1))
            progressAnim = progress.interpolate({
                inputRange: [1, flashcards.length],
                outputRange: [100, 300]
            })
            console.log("Hi")
            console.log(flashCardIndex)
            console.log(progress)
            console.log(progressAnim)
        });
        return unsubscribe;
     }, [navigation]);
    const back = () => {
        if (flashCardIndex > 1) {
            setFlashCardIndex(flashCardIndex - 1)
            Animated.timing(progress, {
                toValue: flashCardIndex - 1,
                useNativeDriver: false
            }).start()
        }
    }
    const next = () => {
        if (flashCardIndex < flashcards.length) {
            setFlashCardIndex(flashCardIndex + 1)
            Animated.timing(progress, {
                toValue: flashCardIndex + 1,
                useNativeDriver: false
            }).start()
            console.log(flashCardIndex)
            console.log(progress)
            console.log(progressAnim)
        }
    }
    const goBack = () => {
        if(!navigation.canGoBack()) {
            return null;
        }
        setFlashCardIndex(1)
            Animated.timing(progress, {
                toValue: 1,
                useNativeDriver: false
            }).start()
        return navigation.goBack()
    }
  return (
    <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => goBack()}
          >
            <Image source={require('../assets/images/close.png')} style={{height: 20, width: 20}}/>
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <Animated.View 
                style={{
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: '#8fdf02',
                    borderColor: '#7bc70e',
                    borderWidth: 5,
                    width: progressAnim
                }}>
            </Animated.View>
          </View>
        </View>
        
        <View style={{marginTop: 40, justifyContent: 'center', alignItems: 'center',}}> 
          <View style={styles.content}>
            <Image
              style={styles.image}
              source={flashcards[flashCardIndex - 1].image}
            />
            <Text style={{fontSize: 30}}>{flashcards[flashCardIndex - 1].word}</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => back()}
          >
            <Octicons name="arrow-left" size={50} color='#2596be' />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => Alert.alert('Right button pressed')}
          >
            <Image source={require('../assets/images/repeat.png')} style={{height: 60, width: 60}}/>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => next()}
          >
            <Octicons name="arrow-right" size={50} color='#2596be' />
          </TouchableOpacity>
          
        </View>

      </View>
  )
}

export default Study