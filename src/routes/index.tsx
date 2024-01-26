import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import {RootStackParamList, RoutesName} from './type';
import useAuthStore from '../stores/auth';
import HomeDrawer from './homeDrawer';
import ProductDetailScreen from '../screens/productDetail';
import Colors from '../styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const {Navigator, Screen} = Stack;
  const {accessToken, loading} = useAuthStore();

  if (loading === undefined) {
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
              }}
              name={RoutesName.PRODUCT_DETAIL}
              component={ProductDetailScreen}
            />
          </>
        ) : (
          <Screen name={RoutesName.LOGIN} component={LoginScreen} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}
