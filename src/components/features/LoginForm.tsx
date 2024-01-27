import React from 'react';
import {Button, View} from 'react-native';
import TextField from '../forms/TextField';
import Colors from '../../styles/colors';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import useAuthStore from '../../stores/auth';
import ErrorView from '../ErrorView';

export const loginForm = z.object({
  email: z.string().min(1, 'Email cannot empty').email(),
  password: z.string().min(1, 'Password cannot empty'),
});

export type LoginForm = z.infer<typeof loginForm>;

export const initLoginForm = {
  email: '',
  password: '',
};

export default function LoginFormView() {
  const {login, error, loading} = useAuthStore();

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
    await login(data);
  };

  return (
    <>
      <ErrorView error={error} />
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
          placeholder="Enter Password..."
          theme="dark"
          type="password"
        />
      </FormProvider>

      <View />
      <Button
        disabled={isSubmitting || loading}
        onPress={handleSubmit(onSubmit)}
        title="Login"
        color={Colors.PRIMARY}
      />
    </>
  );
}
