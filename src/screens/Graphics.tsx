import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, setDate } from "date-fns";
import {
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
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import { useFirebase } from "../hooks/useFirebase";
import { IExpense } from "../types/Expense";
import { getCategoryColor, getCategoryIcon } from "../utils/categories";
import { filterExpensesByMonth } from "../utils/filterExpenses";

interface ChartData {
  x: string;
  y: number;
}

const chartData = [
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 },
];

export const GraphicsScreen: React.FC = () => {
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

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const expensesGroupedByCategory = useMemo(() => {
    if (!expenses) return [];

    return expenses.reduce((expensesGrouped: ChartData[], expense) => {
      const categoryExistsOnArray = expensesGrouped.find(
        (e) => e.x === expense.category
      );

      if (!categoryExistsOnArray) {
        return [...expensesGrouped, { x: expense.category, y: expense.amount }];
      }

      return expensesGrouped.map((e) => {
        if (e.x === expense.category) {
          return {
            ...e,
            y: e.y + expense.amount,
          };
        }

        return e;
      });
    }, []);
  }, [expenses]);

  function handleUpdateMonthSelected(step: -1 | 1) {
    const newMonthSelected = addMonths(monthSelected, step);
    setMonthSelected(newMonthSelected);
  }

  return (
    <View flex={1} height="full">
      {isLoading || isFetching ? (
        <Spinner colorScheme="emerald" size="lg" />
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

          <View display="flex" alignItems="center" flex={1}>
            <VictoryPie
              data={expensesGroupedByCategory}
              colorScale={expensesGroupedByCategory.map((c) =>
                getCategoryColor(c.x)
              )}
              animate={{
                duration: 150,
              }}
              width={300}
              labels={expensesGroupedByCategory.map(
                (expenseCategory) =>
                  `${((expenseCategory.y / totalExpenses) * 100).toFixed(0)}%`
              )}
              innerRadius={50}
              labelRadius={({ innerRadius }) => Number(innerRadius) + 30}
              padding={{ top: 20, bottom: 90 }}
            />
          </View>

          <FlatList
            flex={1}
            data={expensesGroupedByCategory}
            keyExtractor={(item) => item.x}
            renderItem={({ item }) => (
              <Flex
                flexDir="row"
                my={1}
                mx={2}
                px={3}
                py={2}
                rounded="md"
                alignItems="center"
                bg="white"
              >
                <Icon
                  as={Feather}
                  name={getCategoryIcon(item.x)}
                  color={getCategoryColor(item.x)}
                  size={6}
                />

                <Flex
                  ml={2}
                  flex={1}
                  flexDir="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="md"
                    fontWeight={500}
                    color={getCategoryColor(item.x)}
                  >
                    {item.x}
                  </Text>
                  <Text fontSize="md">{`R$ ${item.y
                    .toFixed(2)
                    .replace(".", ",")}`}</Text>
                </Flex>
              </Flex>
            )}
          />
        </>
      )}
    </View>
  );
};
