import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile';
import ProductScreen from '../screens/products';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/globalStyles';
import useAuthStore from '../stores/auth';
import {HomeDrawerStackParamList, RoutesName} from './type';

const Drawer = createDrawerNavigator<HomeDrawerStackParamList>();

const CartButton = () => {
  return (
    <View style={[globalStyles.mr20, globalStyles.mt5]}>
      <Icon name={'shopping-cart'} size={20} color="white" />
      <View style={style.badgeCart}>
        <Text style={globalStyles.fs12}>1</Text>
      </View>
    </View>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {navigation, state} = props;
  const {routes, index} = state;
  const focusedRoute = routes[index].name;
  const {logout} = useAuthStore();

  return (
    <DrawerContentScrollView {...props}>
      <View style={[globalStyles.flex1, globalStyles.jcSb, globalStyles.h100p]}>
        <View>
          {routes.map(route => (
            <DrawerItem
              focused={focusedRoute === route.name}
              key={route.key}
              label={route.name}
              onPress={() => navigation.navigate(route.name)}
              activeBackgroundColor={Colors.PRIMARY}
              activeTintColor={Colors.DARK}
              inactiveTintColor="white"
            />
          ))}
        </View>

        <DrawerItem
          label="Logout"
          onPress={() => logout()}
          inactiveTintColor={Colors.PRIMARY}
          inactiveBackgroundColor={Colors.DARK}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function HomeDrawer() {
  const {Navigator, Screen} = Drawer;

  return (
    <>
      <StatusBar backgroundColor={Colors.DARK} />
      <Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          title: 'Bababos',
          headerStyle: {
            backgroundColor: Colors.DARK,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: Colors.DARK,
          },
          headerRight: () => <CartButton />,
        }}>
        <Screen name={RoutesName.PROFILE} component={ProfileScreen} />
        <Screen name={RoutesName.PRODUCT} component={ProductScreen} />
      </Navigator>
    </>
  );
}

const style = StyleSheet.create({
  badgeCart: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: -10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
