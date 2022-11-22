import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useToast } from "native-base";
import { createContext, useContext, useMemo } from "react";
import { Alert } from "react-native";
import { app } from "../../firebase.config";
import { IExpense } from "../types/Expense";
import { orderExpensesByDate } from "../utils/orderExpenses";
import { useAuth } from "./useAuth";

interface FirebaseContextProps {
  getExpenses(): Promise<IExpense[] | undefined>;
  addExpense: (expense: IExpense) => Promise<void>;
  deleteExpense(expenseId: string): Promise<void>;
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
  const toast = useToast();

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

  async function deleteExpense(expenseId: string) {
    if (!expensesRef) {
      Alert.alert("É necessário estar logado para adicionar uma despesa.");
      return;
    }

    try {
      await deleteDoc(doc(db, "expenses", expenseId));
      toast.show({
        description: "Despesa removida com sucesso!",
        backgroundColor: "emerald.700",
        color: "white",
        marginBottom: "10",
        duration: 3000,
      });
    } catch {
      toast.show({
        description: "Não foi possível remover despesa",
        backgroundColor: "red.600",
        color: "white",
        marginBottom: "10",
        duration: 3000,
      });
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        getExpenses,
        addExpense,
        deleteExpense,
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
