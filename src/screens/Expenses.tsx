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
  Spinner,
  Text,
  View,
} from "native-base";
import { useMemo, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { ExpenseCard } from "../components/ExpenseCard";
import { useFirebase } from "../hooks/useFirebase";
import { IExpense } from "../types/Expense";
import { filterExpensesByMonth } from "../utils/filterExpenses";

export const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getExpenses } = useFirebase();
  const [monthSelected, setMonthSelected] = useState(setDate(new Date(), 1));

  const { isLoading, data, isFetching } = useQuery(["getExpenses"], {
    queryFn: async () => await getExpenses(),
    refetchOnWindowFocus: "always",
    staleTime: Infinity,
  });

  const expenses: IExpense[] = useMemo(() => {
    return filterExpensesByMonth(data || [], monthSelected);
  }, [monthSelected, filterExpensesByMonth, data]);

  function handleUpdateMonthSelected(step: -1 | 1) {
    const newMonthSelected = addMonths(monthSelected, step);
    setMonthSelected(newMonthSelected);
  }

  return (
    <View flex={1} height="full">
      {isLoading || isFetching ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <>
          <Fab
            renderInPortal={false}
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
                description={item.description}
                amount={item.amount}
                category={item.category || ""}
                date={item.date}
                month={item.month}
                year={item.year}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};
