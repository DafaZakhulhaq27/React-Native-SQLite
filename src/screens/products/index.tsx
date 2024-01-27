import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import ProductCards from '../../components/features/Products/ProductCards';
import style from './style';
import {
  HomeDrawerStackParamList,
  RootStackParamList,
  RoutesName,
} from '../../routes/type';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGetProducts} from '../../database/product';

type Props = NativeStackScreenProps<
  HomeDrawerStackParamList & RootStackParamList,
  RoutesName.PRODUCT
>;

export default function ProductScreen({navigation}: Props) {
  const {pDefault} = globalStyles;
  const {data, isLoading} = useGetProducts();

  if (isLoading) {
    return (
      <View style={[pDefault]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      numColumns={2}
      columnWrapperStyle={style.columnWrapperList}
      data={data?.products}
      keyExtractor={product => product?.id.toString()}
      renderItem={({item: product}) => (
        <ProductCards
          product={product}
          onPress={() =>
            navigation.navigate(RoutesName.PRODUCT_DETAIL, {product})
          }
        />
      )}
    />
  );
}
