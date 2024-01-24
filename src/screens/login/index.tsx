import React from 'react';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import {Logo} from '../../assets/images';
import style from './style';
import Colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import LoginFormView from '../../components/features/LoginForm';

export default function LoginScreen() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={Colors.DARK} />
      <View style={style.containerForm}>
        <Image source={Logo} />
        <View style={[globalStyles.gapDefault, globalStyles.mt30]}>
          <LoginFormView />
        </View>
      </View>
    </SafeAreaView>
  );
}
