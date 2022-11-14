import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Card, Fab, FlatList, Icon, Text, Tooltip, View } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import { ExpenseCard } from "../components/ExpenseCard";

export const ExpensesScreen: React.FC = () => {
  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <View flex={1} height="full">
      <Fab
        colorScheme="emerald"
        marginBottom={bottomTabHeight}
        icon={
          <Tooltip label="Adicionar despesa">
            <Icon as={<Feather name="plus" />} size="md" color="white" />
          </Tooltip>
        }
      />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <ExpenseCard />}
        keyExtractor={(item) => String(item)}
      />
    </View>
  );
};
