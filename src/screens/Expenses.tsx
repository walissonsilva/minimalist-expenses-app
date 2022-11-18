import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Box, Fab, FlatList, Icon, Spinner, View } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import { ExpenseCard } from "../components/ExpenseCard";
import { useFirebase } from "../hooks/useFirebase";

export const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getExpenses } = useFirebase();

  const { isLoading, data } = useQuery(["getExpenses"], {
    queryFn: getExpenses,
    refetchOnWindowFocus: "always",
    staleTime: Infinity,
  });

  return (
    <View flex={1} height="full">
      {isLoading ? (
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

          <FlatList
            data={data}
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
        </>
      )}
    </View>
  );
};
