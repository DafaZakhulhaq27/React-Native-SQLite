import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import {RootStackParamList, RoutesName} from './type';
import useAuthStore from '../stores/auth';
import HomeDrawer from './homeDrawer';
import ProductDetailScreen from '../screens/productDetail';
import Colors from '../styles/colors';
import CartButton from '../components/CartButton';
import CartScreen from '../screens/cart';
import ThankYouScreen from '../screens/thankYou';
import {useInitDB} from '../database/utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const {Navigator, Screen} = Stack;
  const {accessToken, loading} = useAuthStore();
  const {isLoading} = useInitDB();

  if (loading === undefined || isLoading) {
    return;
  }

  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        {accessToken ? (
          <>
            <Screen name={RoutesName.HOME} component={HomeDrawer} />
            <Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.DARK,
                },
                headerTintColor: 'white',
                headerTitle: 'Bababos',
                // eslint-disable-next-line react/no-unstable-nested-components
                headerRight: () => <CartButton />,
              }}
              name={RoutesName.PRODUCT_DETAIL}
              component={ProductDetailScreen}
            />
            <Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.DARK,
                },
                headerTintColor: 'white',
                headerTitle: 'Bababos',
              }}
              name={RoutesName.CART}
              component={CartScreen}
            />
            <Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.DARK,
                },
                headerTintColor: 'white',
                headerTitle: 'Bababos',
              }}
              name={RoutesName.THANKYOU}
              component={ThankYouScreen}
            />
          </>
        ) : (
          <Screen name={RoutesName.LOGIN} component={LoginScreen} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}
