import React from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Button } from 'react-native';

function Recognition( { navigation } ) {
    const goBack = () => {
        if(!navigation.canGoBack()) {
            return null;
        }
        return navigation.goBack()
    } 
  return (
    <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
            <Text>Header</Text>
        </View> */}
        <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{
            justifyContent: 'center', alignItems: 'center',
            }}>
                <Text>Recognition</Text>
                <Button title="Go Back" onPress={() => goBack()}/>
            </View>
        </ScrollView>
        </View>
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
    navigation: {
        display: 'flex',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%'
    }
});

export default Recognition