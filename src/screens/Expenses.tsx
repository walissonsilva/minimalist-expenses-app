import { useNavigation } from "@react-navigation/native";
import { Fab, FlatList, Icon, View } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import { ExpenseCard } from "../components/ExpenseCard";

export const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View flex={1} height="full">
      <Fab
        renderInPortal={false}
        colorScheme="emerald"
        icon={<Icon as={<Feather name="plus" />} size="md" color="white" />}
        onPress={() => navigation.navigate("Adicionar Transação" as never)}
      />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => (
          <ExpenseCard
            description="Assaí"
            amount={432.57}
            category="Mercado"
            date={new Date()}
          />
        )}
        keyExtractor={(item) => String(item)}
      />
    </View>
  );
};
