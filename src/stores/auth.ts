import {create} from 'zustand';
import {LoginForm} from '../components/features/LoginForm';

type Props = {
  isAuthenticated: boolean;
  user:
    | {
        email: string;
      }
    | undefined;
  error: string | undefined;
  login: (form: LoginForm) => void;
  logout: () => void;
};

const useAuthStore = create<Props>(set => ({
  isAuthenticated: false,
  user: undefined,
  error: undefined,
  login: ({email, password}: LoginForm) => {
    // Simulate a login process
    if (email === 'test@gmail.com' && password === 'password') {
      set(() => ({isAuthenticated: true, user: {email}, error: undefined}));
    } else {
      set(() => ({
        isAuthenticated: false,
        user: undefined,
        error: 'Username or Password Wrong',
      }));
    }
  },
  logout: () => {
    set(() => ({isAuthenticated: false, user: undefined}));
  },
}));

export default useAuthStore;
