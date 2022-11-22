import * as yup from "yup";

export const addExpenseSchema = yup
  .object({
    description: yup
      .string()
      .min(3, "Precisa ter, pelo menos, 3 caracteres")
      .required("Campo obrigatório"),
    amount: yup
      .number()
      .positive("Precisa ser um valor positivo")
      .required("Campo obrigatório")
      .typeError("Informe um valor numérico"),
    date: yup
      .string()
      .min(10, "Data inválida (dd/mm/yyyy)")
      .required("Campo obrigatório"),
    category: yup.string().required("Campo obrigatório"),
    type: yup.string().optional(),
  })
  .required();
