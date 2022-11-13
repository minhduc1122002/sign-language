import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert, TouchableOpacity, Text, Animated, Dimensions, StatusBar, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../constants/theme'

const { height, width } = Dimensions.get("window")

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
        word: "milk",
        image: require("../assets/images/cry.jpg"),
        video: require("../assets/images/cry.jpg")
    }

]

function Study( {navigation} ) {
    const [flashCardIndex, setFlashCardIndex] = useState(1)
    const [progress, setProgress] = useState(new Animated.Value(1))
    const [showQuizModal, setShowQuizModal] = useState(false);

    const scroll = useRef(null)
    const progressAnim = progress.interpolate({
        inputRange: [1, flashcards.length],
        outputRange: [100, 300]
    })
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setFlashCardIndex(1)
        Animated.timing(progress, {
            toValue: 1,
            useNativeDriver: false
        }).start()
        scroll.current?.scrollTo({x: 0, animated: false})
        setShowQuizModal(false)
      });
      return unsubscribe;
   }, [navigation]);
   
    const prev = () => {
        if (flashCardIndex > 1) {
            setFlashCardIndex(flashCardIndex - 1)
            Animated.timing(progress, {
                toValue: flashCardIndex - 1,
                duration: 1000,
                useNativeDriver: false
            }).start()
            scroll.current?.scrollTo({x: width * (flashCardIndex - 2), animated: true})
        }
    }
    const next = () => {
        if (flashCardIndex < flashcards.length) {
            setFlashCardIndex(flashCardIndex + 1)
            Animated.timing(progress, {
                toValue: flashCardIndex + 1,
                duration: 1000,
                useNativeDriver: false
            }).start()
            scroll.current?.scrollTo({x: width * flashCardIndex, animated: true})
        } else {
          setShowQuizModal(true)
        }
    }
    const goBack = () => {
        if(!navigation.canGoBack()) {
            return null;
        }
        return navigation.goBack()
    }

    // Flip
    const [val, setVal] = useState(0)
    const [value, setValue] = useState(new Animated.Value(0))
    
    const frontInterpolate = value.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    const backInterpolate = value.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    const frontOpacity = value.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    const backOpacity = value.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })

    const flipCard = () => {
      if (val >= 90) {
        setVal(0)
        Animated.spring(value,{
          toValue: 0,
          friction: 8,
          tension: 1,
          useNativeDriver: false
        }).start();
      } else {
        setVal(180)
        Animated.spring(value,{
          toValue: 180,
          friction: 8,
          tension: 1,
          useNativeDriver: false
        }).start();
      }

    }

    const frontAnimatedStyle = {
      transform: [
        { rotateY: frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: backInterpolate }
      ]
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
                      height: 24,
                      borderRadius: 24,
                      backgroundColor: '#30bdf0',
                      borderColor: '#2ba9d6',
                      borderWidth: 5,
                      width: progressAnim
                  }}>
              </Animated.View>
            </View>
          </View>
          <ScrollView
            ref={scroll}
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          > 
            {flashcards.map((flashcard, index) => (
              <View style={styles.contentContainer} key={index}>
                <Animated.View style={[ frontAnimatedStyle, {opacity: frontOpacity}]}>
                  <TouchableOpacity style={styles.content} activeOpacity={1} onPress={() => flipCard()}>
                    <Image 
                      style={styles.contentImage} 
                      // source={{ uri: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/users%2Fe656feba-37c6-4900-80b4-7dd40b038aef.jpg?alt=media&token=e3340868-2bf2-4b14-b86e-9b70ca2b2a47" }}
                      source={require('../assets/images/cry.jpg')}
                    />
                    <Text style={styles.contentText}>{flashcard.word}</Text>
                  </TouchableOpacity> 
                </Animated.View>

                <Animated.View style={[styles.flipCardBack, backAnimatedStyle, {opacity: backOpacity}]}>
                  <TouchableOpacity style={styles.content} activeOpacity={1} onPress={() => flipCard()}>
                    <Image 
                      style={styles.contentImage} 
                      // source={{ uri: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/users%2Fe656feba-37c6-4900-80b4-7dd40b038aef.jpg?alt=media&token=e3340868-2bf2-4b14-b86e-9b70ca2b2a47" }}
                      source={require('../assets/images/cry.jpg')}
                    />
                    <Text style={styles.contentText}>{flashcard.word}</Text>
                  </TouchableOpacity>
                </Animated.View>

              </View>
            ))}
          </ScrollView>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => prev()}
            >
              <FontAwesome name="chevron-left" style={{marginRight: 8}} size={30} color='#2596be' />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => flipCard()}
            >
              <MaterialCommunityIcons name="swap-horizontal-variant" size={40} color='#2596be' />
              <Text style={{color: '#2596be', fontFamily: "Poppins", fontSize: 18}}>FLIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => next()}
            >
              <FontAwesome name="chevron-right" style={{marginLeft: 8}} size={30} color='#2596be' />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showQuizModal}
          >
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                backgroundColor: "#fff",
                width: '90%',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center'
              }}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Hi</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20
                }}>
                  <Text style={{ fontSize: 20, color: COLORS.black}}>Navigate To Quiz</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => navigation.navigate("Quiz")}
                  style={{
                    backgroundColor: COLORS.accent,
                    padding: 20, width: '100%', borderRadius: 20
                }}>
                  <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 20}}>Take Quiz</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: "center"
  },
  progressBar: {
    width: '85%',
    height: 24,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
  },
  contentContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    borderRadius: 20,
    paddingVertical: 48,
    paddingHorizontal: 16,
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
  contentImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 32,
  },
  contentText: {
    fontSize: 28,
    fontFamily: 'Montserrat'
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
    backgroundColor: '#fff',
    width: 60,
    height: 60,
  },
  flipButton: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    width: '30%',
    padding: 12,
    height: 60,
  },
  buttons: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scrollContainer: {
    marginTop: 0,
  },
  flipCardBack: {
    position: "absolute",
  },
});

export default Study