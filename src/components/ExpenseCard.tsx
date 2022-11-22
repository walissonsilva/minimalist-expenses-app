import {
  Actionsheet,
  Box,
  Flex,
  Icon,
  Pressable,
  Text,
  useDisclose,
} from "native-base";
import { categories } from "../constants/categories";
import { IExpense } from "../types/Expense";
import { formatDate } from "../utils/date";
import Feather from "react-native-vector-icons/Feather";

type ExpenseCardProps = Omit<IExpense, "month" | "year">;

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  description,
  amount,
  category,
  date,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  function getCategoryColor() {
    const categoryColor = categories.find((c) => c.title === category)?.color;

    return categoryColor ?? "emerald.700";
  }

  function getCategoryIcon() {
    const categoryIcon = categories.find((c) => c.title === category)?.icon;

    return categoryIcon ?? "help";
  }

  return (
    <Pressable
      paddingX="6"
      paddingY="2"
      marginX={2}
      backgroundColor="white"
      marginTop="2"
      rounded="md"
      onPress={onOpen}
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

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box
            w="100%"
            h={60}
            px={4}
            mb={2}
            justifyContent="center"
            borderBottomColor="gray.200"
            borderBottomWidth={1}
          >
            <Text
              fontSize="16"
              color="gray.800"
              fontWeight={500}
              textTransform="uppercase"
            >
              {description}
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={<Icon as={Feather} name="edit" mt={1} />}
          >
            Editar
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<Icon as={Feather} name="trash" mt={1} />}
            _text={{
              color: "red.600",
            }}
            _icon={{
              color: "red.600",
            }}
          >
            Deletar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Pressable>
  );
};
