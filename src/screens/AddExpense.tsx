import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Radio, View } from "native-base";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useFirebase } from "../hooks/useFirebase";
import { addExpenseSchema } from "../schemas/addExpenseSchema";
import { IExpense } from "../types/Expense";
import { currencyMask, dateMask } from "../utils/masks";

interface IFormData extends IExpense {}

export const AddExpense: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(addExpenseSchema),
  });
  const { addExpense } = useFirebase();
  const navigation = useNavigation();

  const onSubmit: SubmitHandler<IFormData> = async (data: IExpense) => {
    await addExpense(data);
    console.log(data);

    navigation.goBack();
  };

  return (
    <>
      <View flex={1} paddingX={6} paddingY={4}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              label="Descrição"
              onBlur={field.onBlur}
              onChangeText={(val) => field.onChange(val)}
              value={field.value}
              errorMessage={errors.description?.message}
              isInvalid={Boolean(errors.description?.message)}
            />
          )}
          rules={{ required: "Campo obrigatório", minLength: 3 }}
        />
        <Box marginTop={2}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                label="Valor"
                keyboardType="number-pad"
                onBlur={field.onBlur}
                onChangeText={(val) => field.onChange(currencyMask(val))}
                value={String(field.value || 0)}
                errorMessage={errors.amount?.message}
                isInvalid={Boolean(errors.amount?.message)}
              />
            )}
            rules={{ required: "Campo obrigatório", minLength: 3 }}
          />
        </Box>
        <Box marginTop={2}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input
                label="Data"
                keyboardType="number-pad"
                onBlur={field.onBlur}
                onChangeText={(val) => field.onChange(dateMask(val))}
                value={field.value}
                errorMessage={errors.date?.message}
                isInvalid={Boolean(errors.date?.message)}
              />
            )}
          />
        </Box>
        {/* <Box marginTop={2}>
          <Controller
            name="expiration"
            control={control}
            render={({ field }) => (
              <Input
                label="Vencimento"
                marginBottom={2}
                onBlur={field.onBlur}
                onChangeText={(val) => field.onChange(val)}
                value={field.value}
              />
            )}
          />
        </Box> */}

        <Controller
          name="type"
          control={control}
          render={({ field: { onChange } }) => (
            <Radio.Group
              name="type"
              accessibilityLabel="Pick your favorite number"
              onChange={(val) => onChange(val)}
            >
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
          )}
        />
      </View>

      <Box>
        <Button height="12" onPress={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </Box>
    </>
  );
};
