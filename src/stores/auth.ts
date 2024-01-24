import {create} from 'zustand';
import {LoginForm} from '../components/features/LoginForm';
import EncryptedStorage from 'react-native-encrypted-storage';

type Props = {
  accessToken?: string;
  loading?: boolean;
  error?: string;
  login: (form: LoginForm) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuthStore = create<Props>(set => {
  const getAccessToken = async () => {
    try {
      const accessTokenStored = await EncryptedStorage.getItem('accessToken');

      if (accessTokenStored) {
        return accessTokenStored;
      } else {
        return undefined;
      }
    } finally {
      set(state => ({...state, loading: false}));
    }
  };

  getAccessToken().then(initialToken => {
    set(state => ({...state, accessToken: initialToken}));
  });

  return {
    login: async ({email, password}: LoginForm) => {
      try {
        set(state => ({...state, loading: true}));

        if (email === 'test@gmail.com' && password === 'password') {
          await EncryptedStorage.setItem('accessToken', 'xxx');
          set(state => ({
            ...state,
            accessToken: 'xxxx',
            error: undefined,
          }));
        } else {
          set(state => ({
            ...state,
            error: 'Username or Password Wrong',
          }));
        }
      } catch (error) {
        set(state => ({
          ...state,
          error: JSON.stringify(error),
        }));
      } finally {
        set(state => ({...state, loading: false}));
      }
    },
    logout: async () => {
      try {
        set(state => ({...state, loading: true}));

        await EncryptedStorage.removeItem('accessToken');

        set(state => ({
          ...state,
          accessToken: undefined,
        }));
      } catch (error) {
        set(state => ({
          ...state,
          error: JSON.stringify(error),
        }));
      } finally {
        set(state => ({...state, loading: false}));
      }
    },
  };
});

export default useAuthStore;
