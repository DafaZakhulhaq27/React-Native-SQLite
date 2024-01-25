import React from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';

export default function ProfileScreen() {
  const {container, p15, gapDefault, fs22, fs16, textBlack, fw700, fw400} =
    globalStyles;

  return (
    <View style={[container, p15, gapDefault]}>
      <Text style={[fs22, textBlack, fw700]}>PT. Bababos Bangkit Bersama</Text>
      <Text style={[textBlack, fw400]}>
        Gedung Centennial Tower Lt.29 Unit D-F Jl. Jendral Gatot Subroto Kav
        24-25 RT 002 RW 002 Karet Semanggi, Setiabudi Jakarta Selatan, DKI
        Jakarta
      </Text>
      <Text style={[fs16, textBlack, fw700]}>0821-3825-6345</Text>
    </View>
  );
}
