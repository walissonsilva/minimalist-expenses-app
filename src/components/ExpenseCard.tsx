import { Flex, Text } from "native-base";
import { IExpense } from "../types/Expense";
import { formatDate } from "../utils/date";

type ExpenseCardProps = Omit<IExpense, "id">;

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  description,
  amount,
  category,
  date,
}) => {
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

      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <Text color="emerald.700">{category}</Text>
        <Text color="gray.400">{formatDate(new Date(date))}</Text>
      </Flex>
    </Flex>
  );
};
