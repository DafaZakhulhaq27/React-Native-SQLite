import {Product} from '../models/product';

export enum RoutesName {
  HOME = 'Home',
  LOGIN = 'Login',
  PROFILE = 'Profile',
  PRODUCT = 'Product',
  PRODUCT_DETAIL = 'Product Detail',
  CART = 'Cart',
  THANKYOU = 'Thank You',
}

export type RootStackParamList = {
  [RoutesName.LOGIN]: undefined;
  [RoutesName.HOME]: undefined;
  [RoutesName.PRODUCT_DETAIL]: {product: Product};
  [RoutesName.CART]: undefined;
  [RoutesName.THANKYOU]: undefined;
};

// Home Drawer
export type HomeDrawerStackParamList = {
  [RoutesName.PROFILE]: undefined;
  [RoutesName.PRODUCT]: undefined;
};
