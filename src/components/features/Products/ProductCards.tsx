import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Product} from '../../../models/product';
import style from './style';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../styles/colors';

type Props = {
  onPress: () => void;
  product: Product;
};

export default function ProductCards({product, onPress}: Props) {
  return (
    <Pressable style={style.container} onPress={onPress}>
      <Image source={{uri: product.image}} style={style.thumbnail} />
      <View style={[globalStyles.p10, globalStyles.gap3]}>
        <View style={style.categoryBadge}>
          <Text style={[globalStyles.fw700, globalStyles.fs12]}>
            {product.category}
          </Text>
        </View>

        <Text numberOfLines={2} style={[globalStyles.fw700]}>
          {product.title}
        </Text>

        <Text style={[globalStyles.fw900, globalStyles.fs18]}>
          ${product.price}
        </Text>
        <View
          style={[
            globalStyles.fdRow,
            globalStyles.alignCenter,
            globalStyles.gap3,
          ]}>
          <Icon name={'star'} size={15} color={Colors.PRIMARY} />
          <Text
            style={[
              globalStyles.fw900,
              globalStyles.fs15,
              globalStyles.textPrimary,
            ]}>
            {product.rating.rate}
          </Text>
          <Text style={[globalStyles.fs15]}>
            ({product.rating.count} Votes)
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
