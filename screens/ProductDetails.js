import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCartStore } from '../store/CartStore';

const ProductDetails = ({ route }) => {
  
  const { product } = route.params;

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Calculer le prix total en fonction de la quantité
  const totalPrice = (product.price * selectedQuantity).toFixed(2);

  const { addToCart, alert, clearAlert } = useCartStore();

  useEffect(() => {
    if (alert) {
      // Afficher l'alerte pendant quelques secondes, puis la fermer
      const timeout = setTimeout(() => {
        clearAlert();
      }, 3000); // Par exemple, 3 secondes
      return () => clearTimeout(timeout);
    }
  }, [alert, clearAlert]);


  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);  
    setSelectedQuantity(1); // Réinitialise la quantité à 1
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Détails</Text>
      {alert && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>{alert}</Text>
          <TouchableOpacity onPress={clearAlert}>
            <Text style={styles.closeAlertButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{totalPrice} €</Text>
      <Text style={styles.productDetails}>{product.details}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantité :</Text>
        <Picker
          selectedValue={selectedQuantity} 
          style={styles.quantityPicker}
          onValueChange={(itemValue) => setSelectedQuantity(itemValue)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Picker.Item key={value} label={value.toString()} value={value} style={styles.pickerItemTextStyle}/>
          ))}
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddToCart}
      >
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 8,
    color: '#006400', // Vert bouteille
  },
  productDetails: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 20
  },
  quantityPicker: {
    height: 40,
    width: 100,
  },
  button: {
    backgroundColor: '#006400', // Vert bouteille
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: 'rgba(255, 0, 0, 0.9)', // Rouge transparent
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  closeAlertButton: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  pickerItemTextStyle: {
    fontSize: 20,
    textAlign: 'center', 
    justifyContent: 'center',
  }
});

export default ProductDetails;


