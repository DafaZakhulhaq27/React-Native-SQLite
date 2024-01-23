import React from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Logo} from '../../assets/images';
import style from './style';
import Colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

export default function LoginScreen() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={Colors.DARK} />
      <View style={style.containerForm}>
        <Image source={Logo} />
        <View style={[globalStyles.gapDefault, globalStyles.mt20]}>
          <Text>Login Screen</Text>
          <Text>Login Screen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
