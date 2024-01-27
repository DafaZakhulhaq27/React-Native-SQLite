import {create} from 'zustand';
import {Cart} from '../models/cart';
import {Product} from '../models/product';
import {
  addCart,
  deleteCart,
  deleteUserCart,
  getUserCart,
  updateCart,
} from '../database/cart';
import useAuthStore from './auth';
import EncryptedStorage from 'react-native-encrypted-storage';

type Props = {
  cart: Cart[];
  loading?: boolean;
  error?: string;
  addCart: (product: Product, quantity: number) => Promise<void>;
  removeCart: (product: Product, index: number) => void;
  editQuantityCart: (
    product: Product,
    index: number,
    type: 'min' | 'plus',
  ) => void;
  clearCart: () => void;
  getTotalCart: () => number;
  getCartDb: () => void;
};

const useCartStore = create<Props>((set, get) => {
  return {
    cart: [],
    addCart: async (product, quantity) => {
      const cart: Cart[] = [...get().cart];
      const isCartExist = cart.findIndex(_ => _.id === product.id);
      const idUser = useAuthStore.getState().accessToken;

      if (isCartExist > -1) {
        cart[isCartExist].quantity = cart[isCartExist].quantity + 1;
      } else {
        cart.push({...product, quantity});
      }

      await addCart({
        idUser: Number(idUser),
        idProduct: product.id,
        quantity,
      });

      set(state => ({...state, cart}));
    },
    removeCart: (product, index) => {
      set(state => {
        const cart: Cart[] = [...state.cart];
        cart.splice(index, 1);

        deleteCart(product.id);
        return {...state, cart};
      });
    },
    editQuantityCart: (product, index, type) => {
      const cart: Cart[] = [...get().cart];

      if (type === 'min' && cart[index].quantity) {
        cart[index].quantity = cart[index].quantity - 1;
      }

      if (type === 'plus') {
        cart[index].quantity = cart[index].quantity + 1;
      }

      updateCart(product.id, cart[index].quantity);

      set(state => ({...state, cart}));
    },
    clearCart: () => {
      const idUser = useAuthStore.getState().accessToken;

      if (idUser) {
        deleteUserCart(Number(idUser));
      }
      set(state => ({...state, cart: []}));
    },
    getTotalCart: () =>
      Math.round(
        get().cart.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        ) * 100,
      ) / 100,
    getCartDb: async () => {
      const idUser = useAuthStore.getState().accessToken;

      if (idUser) {
        const res = await getUserCart(Number(idUser));

        if (res.status) {
          set(state => ({...state, cart: res.cart}));
        }
      }
    },
  };
});

export default useCartStore;
