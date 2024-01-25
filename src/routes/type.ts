export enum RoutesName {
  HOME = 'Home',
  LOGIN = 'Login',
  PROFILE = 'Profile',
  PRODUCT = 'Product',
}

export type RootStackParamList = {
  [RoutesName.HOME]: undefined;
  [RoutesName.LOGIN]: undefined;
};

// Home Drawer
export type HomeDrawerStackParamList = {
  [RoutesName.PROFILE]: undefined;
  [RoutesName.PRODUCT]: undefined;
};
