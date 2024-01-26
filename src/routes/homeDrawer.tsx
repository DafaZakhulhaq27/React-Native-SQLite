import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile';
import ProductScreen from '../screens/products';
import {StatusBar, View} from 'react-native';
import Colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import useAuthStore from '../stores/auth';
import {HomeDrawerStackParamList, RoutesName} from './type';
import CartButton from '../components/CartButton';

const Drawer = createDrawerNavigator<HomeDrawerStackParamList>();

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
        // eslint-disable-next-line react/no-unstable-nested-components
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
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <CartButton />,
        }}>
        <Screen name={RoutesName.PROFILE} component={ProfileScreen} />
        <Screen name={RoutesName.PRODUCT} component={ProductScreen} />
      </Navigator>
    </>
  );
}
