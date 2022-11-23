import {
  Actionsheet,
  Box,
  Flex,
  Icon,
  Pressable,
  Skeleton,
  Text,
  useDisclose,
  useToast,
} from "native-base";
import { categories } from "../constants/categories";
import { IExpense } from "../types/Expense";
import { formatDate } from "../utils/date";
import Feather from "react-native-vector-icons/Feather";
import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategoryColor, getCategoryIcon } from "../utils/categories";

type ExpenseCardProps = Omit<IExpense, "month" | "year"> & {
  deleteExpense(expenseId: string): Promise<void>;
};

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  id,
  description,
  amount,
  category,
  date,
  deleteExpense,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();

  const { isLoading, mutateAsync: deleteExpenseMutation } = useMutation({
    mutationFn: async () => {
      await deleteExpense(id);
    },
    onSuccess: () => {
      onClose();
    },
  });

  async function handleRemoveExpense() {
    Alert.prompt(
      "Remover despesa",
      `Tem certeza que deseja remover a despesa "${description}"?`,
      [
        { text: "Não", onPress: () => onClose() },
        {
          text: "Sim",
          onPress: async () => {
            onClose();
            await deleteExpenseMutation();
            await queryClient.invalidateQueries({ queryKey: ["getExpenses"] });
          },
        },
      ],
      "default"
    );
  }

  if (isLoading) {
    return <ExpenseCardLoader />;
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
            name={getCategoryIcon(category)}
            size={3}
            color={getCategoryColor(category)}
            mr={1}
          />
          <Text
            color={getCategoryColor(category)}
            fontSize="sm"
            fontWeight={500}
          >
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
            onPress={() => {
              toast.show({
                description: "Em breve...",
                backgroundColor: "blue.700",
                color: "white",
                marginBottom: "10",
                duration: 3000,
              });
              onClose();
            }}
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
            onPress={handleRemoveExpense}
          >
            Remover
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Pressable>
  );
};

export function ExpenseCardLoader() {
  return (
    <Skeleton
      h="16"
      paddingX="3"
      paddingY="0"
      marginTop="3"
      rounded="lg"
      startColor="gray.300"
      endColor="gray.100"
    />
  );
}
