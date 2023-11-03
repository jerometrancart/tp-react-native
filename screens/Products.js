import React, { useState }  from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { productList } from '../datas';

const Products = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produits</Text>
      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher des produits"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        style={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('Details', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price} €</Text>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#006400', // Vert bouteille
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10, // Marge supplémentaire par rapport à la liste des produits
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default Products;

