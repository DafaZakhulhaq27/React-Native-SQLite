import React from 'react';
import {Alert, BackHandler, Button, Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import style from './style';
import Clipboard from '@react-native-clipboard/clipboard';

export default function ThankYouScreen() {
  const {
    container,
    pDefault,
    gapDefault,
    textBlack,
    fw700,
    fs20,
    fs18,
    textCenter,
    mt50,
  } = globalStyles;

  const orderId = '#ORDER12345';

  const copyToClipboard = () => {
    Clipboard.setString(orderId);
    Alert.alert('Success', 'Order Id has been copied');
  };

  return (
    <View style={[container, pDefault, gapDefault]}>
      <Text style={[textBlack, fw700, fs20, textCenter]}>
        Thank You for Ordering...
      </Text>
      <View style={style.orderIdContainer}>
        <Text style={[textBlack, fs18, textCenter]}>{orderId}</Text>
      </View>
      <Button title="Copy" color="grey" onPress={copyToClipboard} />

      <View style={mt50}>
        <Button
          title="Close"
          color="red"
          onPress={() => BackHandler.exitApp()}
        />
      </View>
    </View>
  );
}
