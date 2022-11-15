import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useMemo } from "react";
import { Alert } from "react-native";
import { app } from "../../firebase.config";
import { IExpense } from "../types/Expense";
import { useAuth } from "./useAuth";

interface FirebaseContextProps {
  getExpenses(): Promise<IExpense[] | undefined>;
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

  const expensesRef = useMemo(() => {
    return userInfo.id ? doc(db, "expenses", userInfo.id) : undefined;
  }, [userInfo]);

  async function getExpenses() {
    if (!expensesRef) {
      Alert.alert("É necessário estar logado para visualizar suas despesas.");
      return;
    }

    try {
      const expensesDoc = await getDoc(expensesRef);
      const data = expensesDoc.data();

      return data?.expenses;
    } catch {
      Alert.alert("Erro ao obter suas despesas.");
    }
  }

  async function addExpense(expense: IExpense) {
    if (!expensesRef) {
      Alert.alert("É necessário estar logado para adicionar uma despesa.");
      return;
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
        getExpenses,
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
