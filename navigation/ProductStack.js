import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import CartButton from "../components/CartButton";

const Stack = createNativeStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerRight: () => <CartButton />,
    }}
  >
      <Stack.Screen
        name="Produits"
        component={Products}
        options={{
          headerStyle: {
            backgroundColor: "#273B09",
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen name="Details" component={ProductDetails}
        options={{
          headerStyle: {
            backgroundColor: "#58641D",
          },
          headerTintColor: '#fff'
        }} />
      <Stack.Screen name="Panier" component={Cart} 
        options={{
          headerStyle: {
            backgroundColor: "#7B904B",
          },
          headerTintColor: '#fff'
        }} />  

    </Stack.Navigator>
  );
}
