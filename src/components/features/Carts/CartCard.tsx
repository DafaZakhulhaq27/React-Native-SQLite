import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Cart} from '../../../models/cart';
import globalStyles from '../../../styles/globalStyles';
import style from './style';
import useCartStore from '../../../stores/cart';

type Props = {
  index: number;
} & Cart;

export default function CartCard({index, ...data}: Props) {
  const {editQuantityCart, removeCart} = useCartStore();
  const {
    fdRow,
    gapDefault,
    mb20,
    flex1,
    gap3,
    jcSb,
    fw500,
    fw700,
    fs20,
    alignCenter,
    textWhite,
  } = globalStyles;

  return (
    <View style={[fdRow, gapDefault, mb20]}>
      <Image source={{uri: data.image}} style={style.thumbnail} />
      <View style={[flex1, gap3, jcSb]}>
        <View>
          <Text numberOfLines={1} style={[fw500]}>
            {data.title}
          </Text>
          <Text numberOfLines={1} style={[fw700, fs20]}>
            ${data.price}
          </Text>
        </View>
        <View style={[fdRow, gapDefault, alignCenter]}>
          <Pressable
            onPress={() => editQuantityCart(index, 'plus')}
            style={style.buttonQuantity}>
            <Text style={textWhite}>+</Text>
          </Pressable>
          <Text>{data.quantity}</Text>
          <Pressable
            onPress={() => {
              if (data.quantity === 1) {
                removeCart(index);
              } else {
                editQuantityCart(index, 'min');
              }
            }}
            style={style.buttonQuantity}>
            <Text style={textWhite}>-</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
