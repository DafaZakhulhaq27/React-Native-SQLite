import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/globalStyles';
import useCartStore from '../stores/cart';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, RoutesName} from '../routes/type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const CartButton = () => {
  const {cart, getCartDb} = useCartStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getCartDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate(RoutesName.CART)}
      style={[globalStyles.mr20, globalStyles.mt5]}>
      <Icon name={'shopping-cart'} size={20} color="white" />
      {cart.length !== 0 && (
        <View style={style.badgeCart}>
          <Text style={globalStyles.fs12}>{cart.length}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CartButton;

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
