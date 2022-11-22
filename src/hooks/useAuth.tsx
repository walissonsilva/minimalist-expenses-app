import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebaseConfig } from "../../firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
initializeApp(firebaseConfig);

const GOOGLE_CLIENT_ID = process && process.env && process.env.GOOGLE_CLIENT_ID;

const AUTH_ASYNC_STORAGE_KEY = "auth:user";

interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextProps {
  userInfo: IUser;
  signInWithGoogle: () => Promise<void>;
  isLoggingIn: boolean;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState({} as IUser);
  const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  async function signInWithGoogle() {
    setIsLoggingIn(true);
    promptAsync();
  }

  async function signOut() {
    setUser({} as IUser);
    await AsyncStorage.removeItem(AUTH_ASYNC_STORAGE_KEY);
  }

  useEffect(() => {
    async function loadUserFromAsyncStorage() {
      const userDataFromStorage = await AsyncStorage.getItem(
        AUTH_ASYNC_STORAGE_KEY
      );

      if (userDataFromStorage) {
        const userData = JSON.parse(userDataFromStorage);
        setUser(userData);
      }
    }

    loadUserFromAsyncStorage();
  }, []);

  useEffect(() => {
    async function getGoogleData() {
      if (response?.type === "success") {
        const { id_token } = response?.params;
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        try {
          const result = await signInWithCredential(auth, credential);
          const { user } = result;

          const userData = {
            id: user.uid,
            email: String(user.email),
            name: String(user.displayName),
            avatarUrl: String(user.photoURL),
          };

          setUser(userData);
          await AsyncStorage.setItem(
            AUTH_ASYNC_STORAGE_KEY,
            JSON.stringify(userData)
          );
        } catch (err) {
          console.log(err);
        }
      }

      setIsLoggingIn(false);
    }

    if (!user.id) {
      getGoogleData();
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        userInfo: user,
        signInWithGoogle,
        isLoggingIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used inside of a AuthContext");

  return context;
};
