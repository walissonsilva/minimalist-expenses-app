import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Radio, View } from "native-base";
import { Platform } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const AddExpense: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View flex={1} paddingX={6} paddingY={4}>
        <Input label="Descrição" marginBottom={2} />
        <Input
          label="Valor"
          marginBottom={2}
          keyboardType={Platform.OS === "ios" ? "numeric" : "numeric"}
        />
        <Input label="Data" marginBottom={2} />
        <Input label="Vencimento" marginBottom={2} />

        <Radio.Group name="type" accessibilityLabel="Pick your favorite number">
          <Flex flexDir="row" mt={4} mx={1}>
            <Radio
              value="fixed"
              size="sm"
              _text={{
                color: "gray.500",
                fontWeight: 500,
              }}
            >
              Fixo
            </Radio>
            <Radio
              value="installments"
              size="sm"
              ml={4}
              _text={{
                color: "gray.500",
                fontWeight: 500,
              }}
            >
              Parcelado
            </Radio>
          </Flex>
        </Radio.Group>
      </View>

      <Box>
        <Button height="12" onPress={() => navigation.goBack()}>
          Salvar
        </Button>
      </Box>
    </>
  );
};
