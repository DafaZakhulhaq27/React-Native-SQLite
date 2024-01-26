import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import useCartStore from '../../stores/cart';
import CartCard from '../../components/features/Carts/CartCard';
import Colors from '../../styles/colors';

export default function CartScreen() {
  const {
    container,
    pDefault,
    gapDefault,
    fw900,
    fs24,
    alignEnd,
    pt15,
    fdRow,
    jcSb,
  } = globalStyles;
  const {cart, getTotalCart} = useCartStore();

  return (
    <View style={[container, pDefault, gapDefault]}>
      <FlatList
        data={cart}
        ListEmptyComponent={<Text>Cart is Empty</Text>}
        keyExtractor={_ => _?.id.toString()}
        renderItem={({item, index}) => <CartCard index={index} {...item} />}
      />
      {cart.length !== 0 && (
        <View style={[pt15, fdRow, jcSb, alignEnd]}>
          <View>
            <Text>Total :</Text>
            <Text style={[fw900, fs24]}>${getTotalCart()}</Text>
          </View>
          <View>
            <Button title="Checkout" color={Colors.PRIMARY} />
          </View>
        </View>
      )}
    </View>
  );
}
