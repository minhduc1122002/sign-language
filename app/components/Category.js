import React, { useState, useEffect, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList, Image } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import data from '../data/Data';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Category( { navigation } ) {
    const [progress, setProgress] = useState([])
    const [appIsReady, setAppIsReady] = useState(false);
    const getProgress = async () => {
        try {
            const items = await AsyncStorage.getItem('Progress')
            if (items != null) {
                setProgress(JSON.parse(items))
            }
        } catch (e) {
            console.log(e)
        }
    }
    const addProgress = async (course) => {
        if (progress.find(p => p.title === course.title)) {
            return navigation.navigate("Study", {course})
        }
        try {
            const newProgress = {
                ...course,
                progress: "0%"
            }
            await AsyncStorage.setItem('Progress', JSON.stringify([...progress, newProgress]))
            setProgress([...progress, newProgress]);
            navigation.navigate("Study", {course})
        } catch (e) {
            console.log(e)
        }
    }
    const clearProgress = async () => {
        try {
            await AsyncStorage.setItem('Progress', JSON.stringify([]))
            setProgress([]);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                await getProgress()
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        });
        return unsubscribe;
    }, [navigation]);

    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    return (
        <>
            <SectionGrid
                itemDimension={150}
                spacing={8}
                sections={[
                    {
                        title: "Easy",
                        data: data.filter(item => {
                            return item.level == "Easy"
                        })
                    },
                    {
                        title: "Intermediate",
                        data: data.filter(item => {
                            return item.level == "Intermediate"
                        })
                    },
                    {
                        title: "Advanced",
                        data: data.filter(item => {
                            return item.level == "Advanced"
                        })
                    }
                ]}
                style={styles.gridView}
                stickySectionHeadersEnabled={false}
                renderItem={({ item, section, index }) => {
                    return (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => addProgress(item)}>
                        <Image style={styles.itemImage} source={{ uri: item.image }}/>
                        <View style={{padding: 5}}>
                            <Text style={styles.itemInfo.info}>{item.title}</Text>
                            <Text style={styles.itemInfo.level}>{item.level}</Text>
                        </View>
                    </TouchableOpacity>
                )}}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View style={{flex: 1, padding: 10}}>
                            <Image style={styles.banner} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/users%2Fe656feba-37c6-4900-80b4-7dd40b038aef.jpg?alt=media&token=e3340868-2bf2-4b14-b86e-9b70ca2b2a47" }}/>
                        </View>
                        <View style={{flex: 1, padding: 10, marginVertical: 16}}>
                            <Searchbar 
                                searchIcon={
                                    <Feather name="search" color="#b4b4b4" size = {20} />
                                }
                                style={styles.searchBar}
                                inputStyle={styles.textSearch}
                                placeholder="Search"
                            />
                        </View>
                        <View>
                            <Text style={styles.sectionHeader}>My courses</Text>
                            {progress?.map((p, index) => (
                                <View style={{marginVertical: 8}} key={index}>
                                    <TouchableOpacity style={[styles.itemContainer, styles.learnedItemContainer]} onPress={() => navigation.navigate("Study", {course: p})}>
                                        <Image style={[styles.itemImage, styles.learnedItemImage]} source={{ uri: p.image }}/>
                                        <View style={{padding: 5, flex: 1}}>
                                            <Text style={styles.itemInfo.info}>{p.title}</Text>
                                            <Text style={styles.itemInfo.level}>{p.level}</Text>
                                            <View style={styles.progressBar}>
                                                <View 
                                                    style={{
                                                        height: 20,
                                                        borderRadius: 24,
                                                        backgroundColor: '#30bdf0',
                                                        borderColor: '#2ba9d6',
                                                        borderWidth: p.progress != "0%" ? 5 : 0,
                                                        width: p.progress
                                                    }}>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                ))
                            }
                        </View>
                    </>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    learnedItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 8,
        marginRight: 8,
        alignItems: 'center'
    },
    itemImage: {
        resize: 'cover',
        height: 100,
        borderRadius: 5,
    },
    learnedItemImage: {
        width: '25%',
        height: '80%',
        marginLeft: 10,
        marginRight: 20
    },
    itemInfo: {
        info: {
            fontSize: 14,
            fontFamily: 'Poppins',
            color: '#130b43'   
        },
        level: {
            fontSize: 12,
            fontFamily: 'Montserrat',
            color: '#5c5589'
        }
    },
    sectionHeader: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'Poppins',
        color: '#130b43',
        marginLeft: 8,
        marginTop: 12,
    },
    banner: {
        resize: 'cover',
        height: 200,
        borderRadius: 10,
    },
    searchBarContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        borderRadius: 8
    },
    textSearch: {
        color: '#fe7878',
    },
    progressBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#f3f3f3',
        borderRadius: 20,
        marginTop: 8,
        marginRight: 25
    },
});

export default Category