import React from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import Category from '../components/Category.js'

function Learn( { navigation } ) { 
  return (
    <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
            <Text>Header</Text>
        </View> */}
        <Category navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        display: 'flex',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default Learn