import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import ProductStack from './navigation/ProductStack';
import React, { useEffect } from 'react';
import { useCartStore } from './store/CartStore'; 


export default function App() {
  const { loadCartFromAsyncStorage } = useCartStore();
  useEffect(() => {
    loadCartFromAsyncStorage(); 
  }, []);
  return (
    <NavigationContainer>
      <ProductStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
