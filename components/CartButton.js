import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../store/CartStore";

const CartButtonWithBadge = () => {
  const navigation = useNavigation();
  const { cart } = useCartStore();

  // Calculer le nombre total d'articles dans le panier
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Panier");
      }}
    >
      <View style={styles.cartIconContainer}>
        <Ionicons name="cart" size={36} color="#fff" />
        {totalItemsInCart > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItemsInCart}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default CartButtonWithBadge;

