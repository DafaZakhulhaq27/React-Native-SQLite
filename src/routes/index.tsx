import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import {RootStackParamList, RoutesName} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  const {Navigator, Screen} = Stack;

  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name={RoutesName.LOGIN} component={LoginScreen} />
        <Screen name={RoutesName.HOME} component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
