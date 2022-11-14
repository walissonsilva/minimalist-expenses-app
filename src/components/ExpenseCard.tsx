import { Flex, Text } from "native-base";

export const ExpenseCard: React.FC = () => {
  return (
    <Flex paddingX="6" paddingY="2" backgroundColor="white" marginTop="1">
      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <Text color="darkText" fontSize="lg" fontWeight="medium">
          Assaí
        </Text>

        <Text fontSize="lg" color="red.600">
          R$ 434,90
        </Text>
      </Flex>

      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <Text color="emerald.700">Mercado</Text>
        <Text color="gray.400">05/11/2022</Text>
      </Flex>
    </Flex>
  );
};
