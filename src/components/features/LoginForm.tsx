import React from 'react';
import {Button, View} from 'react-native';
import TextField from '../forms/TextField';
import Colors from '../../styles/colors';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

export const loginForm = z.object({
  email: z.string().email().min(1, 'Email cannot empty'),
  password: z.string().min(1, 'Password cannot empty'),
});

export type LoginForm = z.infer<typeof loginForm>;

export const initLoginForm = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const methods = useForm<LoginForm>({
    mode: 'onBlur',
    resolver: zodResolver(loginForm),
    defaultValues: initLoginForm,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = async (data: LoginForm) => {
    console.log(data, 'data');
  };

  return (
    <>
      <FormProvider {...methods}>
        <TextField
          label="Email"
          name="email"
          placeholder="Enter Email..."
          theme="dark"
        />
        <TextField
          label="Password"
          name="password"
          placeholder="Enter Username..."
          theme="dark"
          type="password"
        />
      </FormProvider>

      <View />
      <Button
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        title="Login"
        color={Colors.PRIMARY}
      />
    </>
  );
}
