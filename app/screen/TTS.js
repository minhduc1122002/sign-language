import React, { useState } from 'react';

import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';

import * as Speech from 'expo-speech';

import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import SelectDropdown from 'react-native-select-dropdown';


export default function TTS() {
  const [input,setInput] = useState('');
  const [rate, setRate] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [isTouchEndedRate, setIsTouchEndedRate] = useState(false);
  const [isTouchEndedPitch, setIsTouchEndedPitch] = useState(false);
  const [language, setLanguage] = useState('')
  const lan = ["English", "Vietnamese"];

  function speak (pitch_, rate_, language_): void {
    const thingsToSay = input;
    if (language_ === "English") {
      language_ = 'en'
    } else {
      language_ = 'vi'
    }
    const options = {
          language: language_, 
          pitch: pitch_,
          rate: rate_,
        };
    Speech.speak(thingsToSay, options);
    console.log(language_)
  };


    return (
      <View style={styles.container}>
        <Text style={styles.header}>Text To Speech </Text>
        <TextInput style={styles.text} 
                  placeholder="Enter your text:" 
                  value={input} 
                  onChangeText={(text) => setInput(text)} /> 
        <View style={styles.setting}> 
          <SelectDropdown
              data={lan}
              onSelect={(selectedItem, index) => {
                setLanguage(selectedItem)
              }}  
              defaultButtonText={'Select Language'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
          /> 
          <Text> Pitch </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={isTouchEndedPitch ? pitch : 0}
            onValueChange={(e) => setPitch(e)}
            onTouchEnd={() => setIsTouchEndedPitch(true)}
            onTouchStart={() => setIsTouchEndedPitch(false)}
          />
          <Text> Rate </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={isTouchEndedRate ? rate : 0}
            onValueChange={(e) => setRate(e)}
            onTouchEnd={() => setIsTouchEndedRate(true)}
            onTouchStart={() => setIsTouchEndedRate(false)}
          />
          <TouchableOpacity style = {styles.speech}
                            onPress = {() => {speak(pitch, rate, language)}}>
              <FontAwesome5 name="volume-up" size={24}/>
          </TouchableOpacity>
        </View>   
      </View>
    );
  }

// CSS

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  text: {
    marginTop: 35,
    width: 380,
    height:300,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white'
  },

  setting: {
    marginTop: 35,
    width: 380,
    height:300,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white'
  },

  //  speech:{
  //   width: 220,
  //   height:220,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   borderRadius: 160,
  //   marginTop: 50,
  //   backgroundColor: 'black'
  // },

    header: {
    top: 10,
    color: 'black',
    height:45,
    fontSize: 28.84,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  showtext: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  },

  slider: {
    width: 300,
    alignSelf: 'center',
  },
  dropdownsRow: {flexDirection: 'row', width: '50%'},

  dropdown1BtnStyle: {
    alignSelf: 'center',
    top: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

});
// import React from 'react';
// import { Text, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
// import { Constants, Speech } from 'expo';

// const EXAMPLES = [
//   { language: 'vi', text: 'xin chào việt nam' },
//   { language: 'vn', text: 'xin chào việt nam' },
//   { language: 'en', text: 'Charlie Cheever chased a chortling choosy child' },
//   { language: 'en', text: 'Adam Perry ate a pear in pairs in Paris' },
// ];


// class AmountControlButton extends React.Component {
//   render() {
//     return (
//       <TouchableOpacity
//         onPress={this.props.disabled ? null : this.props.onPress}
//         hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}>
//         <Text
//           style={{
//             color: this.props.disabled ? '#ccc' : 'blue',
//             fontWeight: 'bold',
//             paddingHorizontal: 5,
//             fontSize: 18,
//           }}>
//           {this.props.title}
//         </Text>
//       </TouchableOpacity>
//     );
//   }
// }

// export default class TTS extends React.Component {
//   static navigationOptions = {
//     title: 'Speech',
//   };

//   state = {
//     selectedExample: EXAMPLES[0],
//     inProgress: false,
//     pitch: 1,
//     rate: 0.75,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}>Select a phrase</Text>
//         </View>

//         <View style={styles.examplesContainer}>
//           {EXAMPLES.map(this._renderExample)}
//         </View>

//         <View style={styles.separator} />

//         <View style={styles.controlRow}>
//           <Button
//             disabled={this.state.inProgress}
//             onPress={this._speak}
//             title="Speak"
//           />

//           <Button
//             disabled={!this.state.inProgress}
//             onPress={this._stop}
//             title="Stop"
//           />
//         </View>

//         <Text style={styles.controlText}>
//           Pitch: {this.state.pitch.toFixed(2)}
//         </Text>
//         <View style={styles.controlRow}>
//           <AmountControlButton
//             onPress={this._increasePitch}
//             title="Increase"
//             disabled={this.state.inProgress}
//           />

//           <Text>/</Text>

//           <AmountControlButton
//             onPress={this._decreasePitch}
//             title="Decrease"
//             disabled={this.state.inProgress}
//           />
//         </View>

//         <Text style={styles.controlText}>
//           Rate: {this.state.rate.toFixed(2)}
//         </Text>
//         <View style={styles.controlRow}>
//           <AmountControlButton
//             onPress={this._increaseRate}
//             title="Increase"
//             disabled={this.state.inProgress}
//           />

//           <Text>/</Text>
//           <AmountControlButton
//             onPress={this._decreaseRate}
//             title="Decrease"
//             disabled={this.state.inProgress}
//           />
//         </View>
//       </View>
//     );
//   }

//   _speak = () => {
//     const start = () => {
//       this.setState({ inProgress: true });
//     };
//     const complete = () => {
//       this.state.inProgress && this.setState({ inProgress: false });
//     };

//     Speech.speak(this.state.selectedExample.text, {
//       language: this.state.selectedExample.language,
//       pitch: this.state.pitch,
//       rate: this.state.rate,
//       onStart: start,
//       onDone: complete,
//       onStopped: complete,
//       onError: complete,
//     });
//   };

//   _stop = () => {
//     Speech.stop();
//   };

//   _increasePitch = () => {
//     this.setState(state => ({
//       ...state,
//       pitch: state.pitch + 0.1,
//     }));
//   };

//   _increaseRate = () => {
//     this.setState(state => ({
//       ...state,
//       rate: state.rate + 0.1,
//     }));
//   };

//   _decreasePitch = () => {
//     this.setState(state => ({
//       ...state,
//       pitch: state.pitch - 0.1,
//     }));
//   };

//   _decreaseRate = () => {
//     this.setState(state => ({
//       ...state,
//       rate: state.rate - 0.1,
//     }));
//   };

//   _renderExample = (example, i) => {
//     let { selectedExample } = this.state;
//     let isSelected = selectedExample === example;

//     return (
//       <TouchableOpacity
//         key={i}
//         hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
//         onPress={() => this._selectExample(example)}>
//         <Text
//           style={[
//             styles.exampleText,
//             isSelected && styles.selectedExampleText,
//           ]}>
//           {example.text} ({example.language})
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   _selectExample = example => {
//     this.setState({ selectedExample: example });
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 35,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginTop: 0,
//     marginBottom: 15,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   headerContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginHorizontal: 20,
//     marginBottom: 0,
//     marginTop: 20,
//   },
//   exampleText: {
//     fontSize: 15,
//     color: '#ccc',
//     marginVertical: 10,
//   },
//   examplesContainer: {
//     paddingTop: 15,
//     paddingBottom: 10,
//     paddingHorizontal: 20,
//   },
//   selectedExampleText: {
//     color: 'black',
//   },
//   controlText: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   controlRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
// });
// import React, { useState } from 'react';
// import { View, Text } from 'react-native';

// import Slider from '@react-native-community/slider';

// const TTS = () => {
//   const [value, setValue] = useState(0);
//   const [isTouchEnded, setIsTouchEnded] = useState(false);

//   return (
//     <View>
//       <Text> {Math.floor(value*100)} </Text>
//       <Slider
//         minimumValue={0}
//         maximumValue={1}
//         value={isTouchEnded ? value : 0}
//         onValueChange={(e) => setValue(e)}
//         onTouchEnd={() => setIsTouchEnded(true)}
//         onTouchStart={() => setIsTouchEnded(false)}
//       />
//     </View>
//   );
// };

// export default TTS;