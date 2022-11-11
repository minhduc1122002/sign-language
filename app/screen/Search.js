import React, { useState, useEffect } from 'react';
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
        const itemData = item.gloss
          ? item.gloss
          : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
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

  const ItemView = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText} onPress={() => navigation.navigate("SearchResult", {item})}>
          {item.instance_id}
          {item.gloss}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    borderColor: "#f3f3f3",
    borderBottomWidth: 2
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
  itemText: {
    padding: 12,
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
});

export default Search