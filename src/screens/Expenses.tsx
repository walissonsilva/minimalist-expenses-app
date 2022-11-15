import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Fab, FlatList, Icon, View } from "native-base";
import { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { ExpenseCard } from "../components/ExpenseCard";
import { useFirebase } from "../hooks/useFirebase";
import { IExpense } from "../types/Expense";

export const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getExpenses } = useFirebase();
  const [expenses, setExpenses] = useState([] as IExpense[]);

  useFocusEffect(() => {
    async function loadExpenses() {
      const expensesData = await getExpenses();

      setExpenses(expensesData || []);
    }

    loadExpenses();
  });

  return (
    <View flex={1} height="full">
      <Fab
        renderInPortal={false}
        bgColor="emerald.500"
        icon={<Icon as={<Feather name="plus" />} size="md" color="white" />}
        onPress={() => navigation.navigate("Adicionar Despesa" as never)}
      />

      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseCard
            description={item.description}
            amount={item.amount}
            category={item.category || ""}
            date={item.date}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
