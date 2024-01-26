import React from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';

export default function ThankYouScreen() {
  const {container, pDefault, gapDefault, textBlack, fw700, fs20} =
    globalStyles;

  return (
    <View style={[container, pDefault, gapDefault]}>
      <Text style={[textBlack, fw700, fs20]}>Thank You for Ordering...</Text>
    </View>
  );
}
