import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { Alert } from "react-native";
import { app } from "../../firebase.config";
import { IExpense } from "../types/Expense";
import { useAuth } from "./useAuth";

interface FirebaseContextProps {
  addExpense: (expense: IExpense) => Promise<void>;
}

const FirebaseContext = createContext({} as FirebaseContextProps);

interface FirebaseProviderProps {
  children: React.ReactNode;
}

const db = getFirestore(app);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const { userInfo } = useAuth();

  const expensesRef = doc(db, "expenses", userInfo.id);

  async function getExpenses() {
    const data = await getDoc(expensesRef);
    console.log(data);
  }

  async function addExpense(expense: IExpense) {
    if (!userInfo.id) {
      Alert.alert("É necessário estar logado para adicionar uma despesa.");
    }

    try {
      await updateDoc(expensesRef, {
        expenses: arrayUnion(expense),
      });
    } catch (err: any) {
      if (err.code === "not-found") {
        try {
          await setDoc(expensesRef, {
            expenses: [expense],
          });
        } catch {
          Alert.alert("Erro ao salvar despesa");
        }
      } else {
        Alert.alert("Erro ao salvar despesa");
      }
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        addExpense,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context)
    throw Error("useFirebase must be used inside of a FirebaseContext");

  return context;
};
