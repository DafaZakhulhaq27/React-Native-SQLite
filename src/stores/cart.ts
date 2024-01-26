import {create} from 'zustand';
import {Cart} from '../models/cart';
import {Product} from '../models/product';

type Props = {
  cart: Cart[];
  loading?: boolean;
  error?: string;
  addCart: (product: Product, quantity: number) => void;
  removeCart: (index: number) => void;
  editQuantityCart: (index: number, type: 'min' | 'plus') => void;
  clearCart: () => void;
  getTotalCart: () => number;
};

const useCartStore = create<Props>((set, get) => {
  return {
    cart: [],
    addCart: (product, quantity) => {
      set(state => {
        const cart: Cart[] = [...state.cart];
        const isCartExist = state.cart.findIndex(_ => _.id === product.id);

        if (isCartExist > -1) {
          cart[isCartExist].quantity = cart[isCartExist].quantity + 1;
        } else {
          cart.push({...product, quantity: quantity});
        }

        return {...state, cart};
      });
    },
    removeCart: index => {
      set(state => {
        const cart: Cart[] = [...state.cart];
        cart.splice(index, 1);

        return {...state, cart};
      });
    },
    editQuantityCart: (index, type) => {
      set(state => {
        const cart: Cart[] = [...state.cart];

        if (type === 'min' && cart[index].quantity) {
          cart[index].quantity = cart[index].quantity - 1;
        }

        if (type === 'plus') {
          cart[index].quantity = cart[index].quantity + 1;
        }

        return {...state, cart};
      });
    },
    clearCart: () => {
      set(state => ({...state, cart: []}));
    },
    getTotalCart: () =>
      Math.round(
        get().cart.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        ) * 100,
      ) / 100,
  };
});

export default useCartStore;
