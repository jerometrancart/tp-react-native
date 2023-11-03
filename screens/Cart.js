import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useCartStore } from '../store/CartStore';
import Ionicons from "@expo/vector-icons/Ionicons";

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore();

  // Fonction pour calculer le prix total du panier
  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panier</Text>
      
      {cart.length === 0 ? (
        <Text>Votre panier est vide.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price} € x {item.quantity}</Text>
                </View>
                <View style={styles.controls}>
                  <>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => incrementQuantity(item.id)}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => decrementQuantity(item.id)}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                  </>
                  <>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Ionicons name="trash" size={36} style={styles.removeButton} />
                    </TouchableOpacity>
                  </>
                </View>
              </View>
            )}
          />
          <Text style={styles.total}>Total : {getTotalPrice()} €</Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearCart}
          >
            <Text style={styles.clearButtonText}>Vider le panier</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ajuste la hauteur à l'écran
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  controls: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityButton: {
    backgroundColor: '#006400', // Vert bouteille
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 30
  },
});

export default Cart;

