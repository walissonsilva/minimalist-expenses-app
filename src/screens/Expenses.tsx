import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, setDate } from "date-fns";
import {
  Box,
  Fab,
  FlatList,
  Flex,
  Icon,
  Pressable,
  Text,
  View,
} from "native-base";
import { useMemo, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { ExpenseCard, ExpenseCardLoader } from "../components/ExpenseCard";
import { useFirebase } from "../hooks/useFirebase";
import { IExpense } from "../types/Expense";
import { filterExpensesByMonth } from "../utils/filterExpenses";

export const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getExpenses, deleteExpense } = useFirebase();
  const [monthSelected, setMonthSelected] = useState(setDate(new Date(), 1));

  const { isLoading, data, isFetching } = useQuery(["getExpenses"], {
    queryFn: async () => await getExpenses(),
    refetchOnWindowFocus: "always",
    staleTime: Infinity,
  });

  const expenses: IExpense[] = useMemo(() => {
    return filterExpensesByMonth(data || [], monthSelected);
  }, [monthSelected, filterExpensesByMonth, data]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  function handleUpdateMonthSelected(step: -1 | 1) {
    const newMonthSelected = addMonths(monthSelected, step);
    setMonthSelected(newMonthSelected);
  }

  return (
    <View flex={1} height="full">
      {isLoading || isFetching ? (
        <Flex marginTop={10}>
          <ExpenseCardLoader />
          <ExpenseCardLoader />
          <ExpenseCardLoader />
        </Flex>
      ) : (
        <>
          <Fab
            renderInPortal={false}
            mb={9}
            bgColor="emerald.500"
            icon={<Icon as={<Feather name="plus" />} size="md" color="white" />}
            onPress={() => navigation.navigate("Adicionar Despesa" as never)}
          />

          <Flex
            flexDir="row"
            justifyContent="center"
            alignItems="center"
            pt={4}
            pb={2}
          >
            <Pressable onPress={() => handleUpdateMonthSelected(-1)}>
              <Icon
                as={Feather}
                name="chevron-left"
                minW={12}
                size={5}
                textAlign="center"
              />
            </Pressable>
            <Text fontSize={18} lineHeight={20} textAlign="center">
              {format(monthSelected, "LLLL yyyy")}
            </Text>

            <Pressable onPress={() => handleUpdateMonthSelected(1)}>
              <Icon
                as={Feather}
                name="chevron-right"
                minW={12}
                size={5}
                textAlign="center"
              />
            </Pressable>
          </Flex>

          <FlatList
            data={expenses}
            renderItem={({ item }) => (
              <ExpenseCard
                id={item.id}
                description={item.description}
                amount={item.amount}
                category={item.category || ""}
                date={item.date}
                deleteExpense={deleteExpense}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          <Box
            position="fixed"
            bottom={0}
            h={10}
            left={0}
            w="full"
            bg="emerald.500"
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            px={4}
          >
            <Text color="white" fontSize={18} fontWeight={600}>
              Total
            </Text>
            <Text color="white" fontSize={18} fontWeight={600}>
              {`R$ ${totalExpenses.toFixed(2).replace(".", ",")}`}
            </Text>
          </Box>
        </>
      )}
    </View>
  );
};
