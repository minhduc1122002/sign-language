import * as React from 'react';

import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';

import * as Speech from 'expo-speech';

export default class TTS extends React.Component {

  constructor() {

  super();

  this.state = {
       text: ''
  };
  }
 
  speak = () => 
  {
    var thingsToSay = this.state.text;
    const options = {
          language: 'en',
          pitch: 1.0,
          rate: 0.7,
        };
    Speech.speak(thingsToSay, options);
  }

  render() {

    return (

      <View style = {styles.container}>
      <Text style={styles.header}>Text To Speech </Text>           
        
      <Image style={styles.image}

          source=
          {{
            uri:'http://cdn.onlinewebfonts.com/svg/img_331472.png',
          }}
        />
          
        <TextInput
            style = {styles.text}
            onChangeText={text => {
              this.setState({ text: text });
            }}

            value={this.state.text}
            defaultValue = {"The"}
            placeholder = "ENTER TEXT"

          />

        <TouchableOpacity style = {styles.speech}

        //LINE NUMBER 60 TO LINE NUMBER 80.
          onPress = {() => {

          this.state.text === ''
          ? 
          alert("NO WORD DETECTED")

//SPECIAL CHARACTERS
:(

  this.state.text.indexOf(')') === null || this.state.text.indexOf('(') === null
||this.state.text.indexOf('*') === null || this.state.text.indexOf('&') === null
||this.state.text.indexOf('^') === null || this.state.text.indexOf('%') === null
||this.state.text.indexOf('$') === null || this.state.text.indexOf('#') === null
||this.state.text.indexOf('@') === null || this.state.text.indexOf('!') === null
        
? 
alert("ERROR! AVOID SPECIAL CHARACTERS")
: this.speak()

)
}}>

    <Text style = {styles.showtext}>CLICK TO HEAR</Text>
    </TouchableOpacity>

      </View>
    );
  }
}


//CSS

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '/'
  },

  text: {
    marginTop: 50,
    width: 200,
    height:50,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 4,
    fontSize: 20,
    borderColor: 'black',
    color: 'black',
    borderRadius: 20
  },

   speech:{
    width: 220,
    height:220,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 160,
    marginTop: 50,
    backgroundColor: 'black'
  },

    header: {
     color: 'white',
     height:45,
     fontSize: 28.84,
     backgroundColor:'black',
     textAlign: 'center'
  },

  image: {
    width: 120,
    height: 100,
    marginTop: 20,
    alignSelf: 'center'
  },

  showtext: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  }


});
