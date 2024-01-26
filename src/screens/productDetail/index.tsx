import React from 'react';
import {Image, Text, View, ScrollView, Button} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RoutesName} from '../../routes/type';
import style from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  RoutesName.PRODUCT_DETAIL
>;

export default function ProductDetailScreen({route}: Props) {
  const {
    params: {product},
  } = route;

  const {
    container,
    gapDefault,
    textBlack,
    fw700,
    fs24,
    pDefault,
    fw900,
    fs28,
    fdRow,
  } = globalStyles;

  return (
    <View style={[container, gapDefault]}>
      <ScrollView>
        <Image source={{uri: product.image}} style={style.thumbnail} />
        <View style={[pDefault, gapDefault]}>
          <Text style={[textBlack, fw700, fs24]}>{product.title}</Text>
          <View style={style.categoryBadge}>
            <Text style={[globalStyles.fw700, globalStyles.fs12]}>
              {product.category}
            </Text>
          </View>
          <View style={[fdRow, gapDefault]}>
            <Text style={[fw900, textBlack, fs28]}>${product.price}</Text>
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

          <Text style={[textBlack]}>{product.description}</Text>
        </View>
      </ScrollView>
      <Button title="Add to Cart" color={Colors.PRIMARY} />
    </View>
  );
}
