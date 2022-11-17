import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal, Animated, Dimensions } from 'react-native'
import React , { useState, useRef, useEffect } from 'react'
import  QuizData  from '../data/QuizData'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get("window")

const Quiz = ( {route, navigation} ) => {
  const item = route.params.item
  const flashcards = item.flashcards
  // console.log(flashcards)
  
  const allQuestions = QuizData(flashcards)
  // console.log(allQuestions)
  const scroll = useRef(null)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false)
  const [score, setScore] = useState(0);

  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progessAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%']
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowScoreModal(false)
      setCurrentQuestionIndex(0)
      setScore(0)
      setCurrentOptionSelected(null)
      setCorrectOption(null)
      setIsOptionDisabled(false)
      setShowNextButton(false)
      Animated.timing(progress, {
          toValue: 0,
          useNativeDriver: false
      }).start()
      scroll.current?.scrollTo({x: 0, animated: false})
    });
    return unsubscribe;
 }, [navigation]);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionDisabled(true);
    if (selectedOption==correct_option) {
      setScore(score + 1)
    }
    setShowNextButton(true);
  }

  const handleNext = () => {
    if(currentQuestionIndex == allQuestions.length - 1){
      setShowScoreModal(true);
    } else {
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionDisabled(false);
      setCurrentQuestionIndex(currentQuestionIndex+1);
      setShowNextButton(false);
      scroll.current?.scrollTo({x: width * (currentQuestionIndex + 1), animated: true})
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex+1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionDisabled(false);
    setShowNextButton(false);
    scroll.current?.scrollTo({x: 0, animated: true})
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }
  
  const renderQuestion = ( currentQuestion ) => {
    return (
      <View style={{
        marginVertical: 40
      }}>
        {/*Question Counter*/}
        <View style={styles.questionCounter.container}>
          <Text style={styles.questionCounter.text}>{currentQuestionIndex+1} / {allQuestions.length}</Text>
        </View>

        {/*Question*/}
        <Text style={styles.question.text}>{currentQuestion.question}</Text>
      </View>
    )
  }

  const renderOptions = ( currentQuestion, index ) => {
    const colorStyle = (option) => option==correctOption ? COLORS.success+'20'
    : option==currentOptionSelected ? COLORS.error+'20'
    : COLORS.white
    console.log(currentQuestion)
    return (
      <View>
        {
          currentQuestion.options.map(option => {
            return(
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionDisabled}
              key={option + index}
              style={[styles.option.container, {
                borderColor: option==correctOption
                ? COLORS.success
                : option==currentOptionSelected
                ? COLORS.error
                : COLORS.secondary,
                backgroundColor: colorStyle(option),
              }]}
            >
              <Text style={styles.option.text}>{option}</Text>
              {
                option==correctOption ? (
                  <View style={styles.option.success}>
                    <AntDesign name="check" style={{color: "#fff", fontSize: 20}}/>
                  </View>
                ) : option == currentOptionSelected ? (
                    <View style={styles.option.error}>
                      <AntDesign name="close" style={{color: "#fff", fontSize: 20}}/>
                    </View>
                ) : null
              }
            </TouchableOpacity>
          )})
        }
      </View>
    )
  }

  const renderNextButton = () => {
    if(showNextButton){
      return (
        <TouchableOpacity 
          onPress={handleNext}
          style={styles.nextButton.container}
        >
          <Text style={styles.nextButton.text}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }
  const renderProgressBar = () => {
    return (
      <View style={styles.progressBar.container}>
        <Animated.View style={[styles.progressBar.component, { width: progessAnim }]}>
        </Animated.View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        {renderProgressBar()}
      </View>
      <ScrollView
        ref={scroll}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {allQuestions.map((question, index) => {
          return (
          <View style={{width: width, paddingHorizontal: 16}} key={index}>
            {renderQuestion(question)}
            {renderOptions(question, index)}
          </View>
          )
        })}
      </ScrollView>
      <View style={{paddingHorizontal: 16}}>
        {renderNextButton()}
      </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
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
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score > (allQuestions.length/2) ? 'Congratulations!' : 'Oops!'}</Text>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: 20
              }}>
                <Text style={{
                  fontSize: 30,
                  color: score > (allQuestions.length/2) ? COLORS.success : COLORS.error
                }}>{score}</Text>
                <Text style={{
                  fontSize: 20, color: COLORS.black
                }}>/ {allQuestions.length}</Text>
              </View>
              <TouchableOpacity 
              onPress={restartQuiz}
              style={{
                backgroundColor: COLORS.accent,
                padding: 20, width: '100%', borderRadius: 20
              }}>
                <Text style={{
                  textAlign: 'center', color: COLORS.black, fontSize: 20
                }}>Retry Quiz</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    backgroundColor: '#fff',
    position: 'relative'
  },
  progressBar: {
    container: {
      width: '100%',
      height: 20,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.125)'
    },
    component: {
      height: 20,
      borderRadius: 20,
      backgroundColor: COLORS.accent
    }
  },
  questionCounter: {
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    text: {
      color: '#171717',
      fontSize: 20,
      opacity: 0.6,
    }
  },
  question: {
    text: {
      color: '#171717',
      fontSize: 30,
    }
  },
  option: {
    container: {
      borderWidth: 2,
      height: 60, 
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginVertical: 10
    },
    text: {
      fontSize: 20,
      color: '#171717'
    },
    success: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#00C851',
      justifyContent: 'center',
      alignItems: 'center'
    },
    error: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#FF4444',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  nextButton: {
    container: {
      marginTop: 24,
      width: '100%',
      backgroundColor: "#2596be",
      padding: 15,
      borderRadius: 15
    },
    text: {
      fontSize: 20,
      color: "#fff",
      textAlign: 'center'
    }
  }
})
export default Quiz