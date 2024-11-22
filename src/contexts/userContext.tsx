import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, getDoc} from 'firebase/firestore';
import {signInWithEmailAndPassword} from 'firebase/auth';

import db from '../config/firebase/db';

import {DefaultResponse, Establishment, User} from '../types';
import {auth} from '../config/firebase/app';

import {getEstablishment} from '../services/stablishments';

export interface IUserContextProps {
  user: User | undefined;
  isLoggedIn: boolean;
  login: (params: {
    email: string;
    password: string;
  }) => Promise<DefaultResponse>;
  logout: () => Promise<void>;
  selectEstablishment: (stablishment: Establishment) => void;
  establishment: Establishment | undefined;
}

interface IUserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContextProps>({} as IUserContextProps);

export const UserProvider: FC<IUserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>();
  const [establishment, setEstablishment] = useState<Establishment>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const saveUserInfos = async (user: User, email: string) => {
    setUser(user);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('user-email', email);
  };

  const getUserByEmail = async (
    email: string,
  ): Promise<DefaultResponse & {data?: User}> => {
    try {
      const docRef = doc(db, 'users', email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return {
          success: false,
          message: 'Usuário não existe',
        };
      }

      return {
        success: true,
        data: docSnap.data() as User,
        message: 'Sucesso',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Erro ao tentar recuperar informações do usuário',
      };
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<DefaultResponse> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const response = await getUserByEmail(email);

      if (!response.success) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: response.message,
        });
        return {
          success: false,
          message: response.message,
        };
      }

      saveUserInfos(response.data, email);

      return {
        success: true,
        message: 'Login bem-sucedido',
      };
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Usuário ou senha incorretos',
      });

      return {
        success: false,
        message: 'Falha ao tentar fazer login',
      };
    }
  };

  const selectEstablishment = async (establishment: Establishment) => {
    setEstablishment(establishment);
    await AsyncStorage.setItem('establishment-id', establishment.id);
  };

  const logout = async () => {
    setUser(undefined);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('user-email');
  };

  useEffect(() => {
    async function retrieveAuthInfos() {
      try {
        const userEmail = await AsyncStorage.getItem('user-email');
        const savedEstablishment = await AsyncStorage.getItem(
          'establishment-id',
        );

        if (userEmail) {
          const response = await getUserByEmail(userEmail);

          if (response.data) {
            await login({
              email: userEmail,
              password: response.data.password,
            });
          }
        }

        if (savedEstablishment) {
          const establishment = await getEstablishment(savedEstablishment);

          if (establishment) {
            setEstablishment(establishment);
          }
        }
      } catch (error) {
        console.log('ERROR TRYING TO RETRIEVE USER INFOS');
      }
    }

    retrieveAuthInfos();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        login,
        isLoggedIn,
        establishment,
        selectEstablishment,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useAuth must be used within an UserProvider');
  }

  return context;
};

export default UserContext;
