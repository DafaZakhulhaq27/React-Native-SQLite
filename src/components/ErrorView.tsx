import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Props = {
  readonly error?: string;
};

export default function ErrorView({error}: Props) {
  if (!error) {
    return;
  }

  return (
    <View style={style.container}>
      <Text>{error}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
