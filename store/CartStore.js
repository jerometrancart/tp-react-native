import { create } from 'zustand';
import { produce } from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create((set) => ({
  cart: [],
  alert: null, // Ajoute une alerte initiale à null

  addToCart: async (product, quantity) => {
    try {
      set((state) =>
        produce(state, (draft) => {
          const existingProduct = draft.cart.find((item) => item.id === product.id);
  
          if (existingProduct) {
            existingProduct.quantity += quantity;
          } else {
            draft.cart.push({ ...product, quantity });
          }
  
          // Sauvegarder le panier mis à jour dans AsyncStorage
          (async () => {
            try {
              await AsyncStorage.setItem('cart', JSON.stringify(draft.cart));
            } catch (error) {
              console.error('Erreur lors de la sauvegarde du panier :', error);
            }
          })();
          
          draft.alert = `${quantity} ${product.name} a été ajouté au panier.`;
        })
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier :', error);
    }
  },
  
  clearAlert: () => {
    set({ alert: null }); // Effacez l'alerte en la définissant à null
  },
  
  incrementQuantity: (productId) => {
    set((state) =>
      produce(state, (draft) => {
        const product = draft.cart.find((item) => item.id === productId);
        if (product) {
          product.quantity += 1;
        }
      })
    );
  },
  
  decrementQuantity: (productId) => {
    set((state) =>
      produce(state, (draft) => {
        const product = draft.cart.find((item) => item.id === productId);
        if (product) {
          if (product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      })
    );
  },
  
  removeFromCart: (productId) => {
    set((state) =>
      produce(state, (draft) => {
        draft.cart = draft.cart.filter((product) => product.id !== productId);
      })
    );
  },
  
  clearCart: () => {
    set((state) =>
      produce(state, (draft) => {
        draft.cart = [];
      })
    );
  },

  loadCartFromAsyncStorage: async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        set((state) =>
          produce(state, (draft) => {
            draft.cart = JSON.parse(cartData);
          })
        );
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  },
}));

  
  