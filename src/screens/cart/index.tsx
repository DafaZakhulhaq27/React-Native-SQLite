import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import useCartStore from '../../stores/cart';
import CartCard from '../../components/features/Carts/CartCard';
import Colors from '../../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RoutesName} from '../../routes/type';

type Props = NativeStackScreenProps<RootStackParamList, RoutesName.CART>;

export default function CartScreen({navigation}: Props) {
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
  const {cart, getTotalCart, clearCart} = useCartStore();

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
            <Button
              onPress={() => {
                clearCart();
                navigation.replace(RoutesName.THANKYOU);
              }}
              title="Checkout"
              color={Colors.PRIMARY}
            />
          </View>
        </View>
      )}
    </View>
  );
}
