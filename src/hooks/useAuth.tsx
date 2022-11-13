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

WebBrowser.maybeCompleteAuthSession();
initializeApp(firebaseConfig);

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
    clientId:
      "943858046304-dr8n6c27fkbrncm9dknvmivitnivdanf.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  async function signInWithGoogle() {
    setIsLoggingIn(true);
    promptAsync();
  }

  async function signOut() {
    setUser({} as IUser);
  }

  useEffect(() => {
    async function getGoogleData() {
      if (response?.type === "success") {
        const { id_token } = response?.params;
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        try {
          const result = await signInWithCredential(auth, credential);
          const { user } = result;

          setUser({
            id: user.uid,
            email: String(user.email),
            name: String(user.displayName),
            avatarUrl: String(user.photoURL),
          });
        } catch (err) {
          console.log(err);
        }
      }

      setIsLoggingIn(false);
    }

    getGoogleData();
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
