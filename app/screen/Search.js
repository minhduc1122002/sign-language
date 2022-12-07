import React, { useState, useEffect, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

// import all the components we are going to use
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import data from '../data/Data';

function Search( {navigation} ) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/dxli94/WLASL/master/start_kit/WLASL_v0.3.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.gloss.toUpperCase()
          ? item.gloss.toUpperCase()
          : '';
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) == 0;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item, index }) => {
    // for (i=0;i<item.flashcards[0].length)
    const color = index % 2 == 0 ? "#fff" : '#fafafa'
    return (
      <View style={[styles.itemContainer, {backgroundColor: color}]}>
        <Text style={styles.itemText} onPress={() => navigation.navigate("SearchResult", {item})}>
          {item.gloss}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar 
            searchIcon={
              <Feather name="search" color="#b4b4b4" size = {20} />
            }
            style={styles.searchBar}
            inputStyle={styles.textSearch}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            value={search}
            placeholder="Search"
        />
      </View>
      <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 24
  },
  itemContainer: {
    borderColor: "#f3f3f3",
    borderBottomWidth: 2
  },
  searchBarContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2596be"
  },
  searchBar: {
    borderRadius: 8
  },
  textSearch: {
    color: '#fe7878',
  },
  itemText: {
    padding: 12,
    fontSize: 18,
    fontFamily: 'Montserrat',
    textTransform: 'capitalize'
  },
});

export default Search