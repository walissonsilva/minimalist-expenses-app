import { Box, Flex, Icon, Text } from "native-base";
import { categories } from "../constants/categories";
import { IExpense } from "../types/Expense";
import { formatDate } from "../utils/date";
import Feather from "react-native-vector-icons/Feather";

type ExpenseCardProps = Omit<IExpense, "id">;

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  description,
  amount,
  category,
  date,
}) => {
  function getCategoryColor() {
    const categoryColor = categories.find((c) => c.title === category)?.color;

    return categoryColor ?? "emerald.700";
  }

  function getCategoryIcon() {
    const categoryIcon = categories.find((c) => c.title === category)?.icon;

    return categoryIcon ?? "help";
  }

  return (
    <Flex
      paddingX="6"
      paddingY="2"
      marginX={2}
      backgroundColor="white"
      marginTop="2"
      rounded="md"
    >
      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <Text color="darkText" fontSize="lg" fontWeight="normal">
          {description}
        </Text>

        <Text fontSize="lg" color="red.600">
          {`R$ ${amount.toFixed(2).replace(".", ",")}`}
        </Text>
      </Flex>

      <Flex
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Flex flexDir="row" alignItems="center">
          <Icon
            as={Feather}
            name={getCategoryIcon()}
            size={3}
            color={getCategoryColor()}
            mr={1}
          />
          <Text color={getCategoryColor()} fontSize="sm" fontWeight={500}>
            {category}
          </Text>
        </Flex>
        <Text color="gray.400">{formatDate(new Date(date))}</Text>
      </Flex>
    </Flex>
  );
};
