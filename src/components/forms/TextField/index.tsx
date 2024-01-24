import React, {useState} from 'react';
import {Pressable, Text, TextInput, TextInputProps, View} from 'react-native';
import style from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Controller, useFormContext} from 'react-hook-form';

type Props = {
  theme?: 'light' | 'dark';
  label?: string;
  name: string;
  type?: 'password' | 'text';
} & TextInputProps;

export default function TextField({
  theme = 'light',
  label,
  type = 'text',
  name,
  ...props
}: Props) {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const errorMessage = errors[name ?? '']?.message as string;

  const styleTheme = style(theme);
  const isPassword = type === 'password';

  const [isSecureText, setIsSecureText] = useState(isPassword);

  return (
    <View>
      <Text style={styleTheme.label}>{label}</Text>
      <View>
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styleTheme.input}
              {...props}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              secureTextEntry={isSecureText}
            />
          )}
        />

        {isPassword && (
          <Pressable
            style={styleTheme.iconEye}
            onPress={() => {
              setIsSecureText(prev => !prev);
            }}>
            <Icon
              name={isSecureText ? 'eye' : 'eye-slash'}
              size={30}
              color="black"
            />
          </Pressable>
        )}
      </View>

      {errorMessage && <Text style={styleTheme.textError}>{errorMessage}</Text>}
    </View>
  );
}
