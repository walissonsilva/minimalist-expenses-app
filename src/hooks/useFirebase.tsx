import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useMemo } from "react";
import { Alert } from "react-native";
import { app } from "../../firebase.config";
import { IExpense } from "../types/Expense";
import { orderExpensesByDate } from "../utils/orderExpenses";
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
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);

      let expenses: IExpense[] = [];
      querySnapshot.forEach((doc) => {
        expenses.push(doc.data() as IExpense);
      });

      const expensesOrderedByDate = orderExpensesByDate(expenses);
      return expensesOrderedByDate;
    } catch {
      Alert.alert("Erro ao obter suas despesas.");
    }
  }

  async function addExpense(expense: IExpense) {
    if (!expensesRef) {
      Alert.alert("É necessário estar logado para adicionar uma despesa.");
      return;
    }

    await setDoc(doc(db, "expenses", expense.id), {
      userId: userInfo.email,
      ...expense,
    });
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
