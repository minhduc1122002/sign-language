import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, StatusBar, Platform, Button } from 'react-native';

function Dictionary( { navigation } ) {
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
                <Text>Home</Text>
                <Button
                    title="Go to Learn Screen"
                    onPress={() => navigation.navigate("Learn")}
                />
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

export default Dictionary