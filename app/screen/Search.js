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
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.instance_id}
        {item.gloss}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#fe7878',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.instance_id + ' Title : ' + item.gloss);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Searchbar 
          searchIcon={
            <Feather name="search" color="#b4b4b4" size = {20} />
          }
          containerStyle={styles.SearchBarStyle}
          inputContainerStyle={styles.in}
          inputStyle={styles.textSearch}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
          placeholder="Search"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 52,
    padding: 5,
  },
  itemStyle: {
    padding: 6,
    fontSize: 20,
  },
  in: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 5,
  },
  textSearch: {
    color: '#fe7878',
  },
  SearchBarStyle: {
    backgroundColor: '#fe7878',
  }
});

export default Search