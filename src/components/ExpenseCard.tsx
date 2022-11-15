import { Flex, Text } from "native-base";
import { IExpense } from "../types/Expense";
import { formatDate } from "../utils/formatDate";

interface ExpenseCardProps extends IExpense {}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  description,
  amount,
  category,
  date,
}) => {
  return (
    <Flex paddingX="6" paddingY="2" backgroundColor="white" marginTop="1">
      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <Text color="darkText" fontSize="lg" fontWeight="medium">
          {description}
        </Text>

        <Text fontSize="lg" color="red.600">
          {`R$ ${amount.toFixed(2).replace(".", ",")}`}
        </Text>
      </Flex>

      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <Text color="emerald.700">{category}</Text>
        <Text color="gray.400">{formatDate(date)}</Text>
      </Flex>
    </Flex>
  );
};
