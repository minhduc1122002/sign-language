import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList, Image } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';

function Category( { navigation } ) {
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
            renderItem={({item, section}) => (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("Study")}>
                    <Image style={styles.itemImage} source={{ uri: item.image }}/>
                    <View style={{padding: 5}}>
                        <Text style={styles.itemInfo.info}>{item.title}</Text>
                        <Text style={styles.itemInfo.level}>{item.level}</Text>
                    </View>
                </TouchableOpacity>
            )}
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
                </>
            )}
        />
    </>
  )
}

const data = [
    {
        image: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/blogs%2Fpngtree-seamless-pineapple-fruit-pattern-background-image_130689.jpg?alt=media&token=8d3c5eaf-5a16-4485-a5f1-975794d5293f",
        title: "Alphabet",
        level: "Easy"
    },
    {
        image: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/blogs%2Fwork_hard_2.png?alt=media&token=97a7f9e3-07f5-4fbf-8271-9f960f965579",
        title: "Number",
        level: "Easy"
    },
    {
        image: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/blogs%2Fpngtree-seamless-pineapple-fruit-pattern-background-image_130689.jpg?alt=media&token=8d3c5eaf-5a16-4485-a5f1-975794d5293f",
        title: "Alphabet",
        level: "Intermediate"
    },
    {
        image: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/blogs%2Fwork_hard_2.png?alt=media&token=97a7f9e3-07f5-4fbf-8271-9f960f965579",
        title: "Number",
        level: "Intermediate"
    },
    {
        image: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/blogs%2Fpngtree-seamless-pineapple-fruit-pattern-background-image_130689.jpg?alt=media&token=8d3c5eaf-5a16-4485-a5f1-975794d5293f",
        title: "Alphabet",
        level: "Advanced"
    },
    {
        image: "https://firebasestorage.googleapis.com/v0/b/e-learning-2497f.appspot.com/o/blogs%2Fwork_hard_2.png?alt=media&token=97a7f9e3-07f5-4fbf-8271-9f960f965579",
        title: "Number",
        level: "Advanced"
    },
]
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
        elevation: 5,
    },
    itemImage: {
        resize: 'cover',
        height: 100,
        borderRadius: 5,
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
        alignItems: 'center',
        color: '#130b43',
        marginLeft: 8,
        marginTop: 12
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
});

export default Category