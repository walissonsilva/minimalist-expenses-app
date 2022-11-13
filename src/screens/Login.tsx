import React from "react";
import { Flex, Image, Text } from "native-base";
import LoginImage from "../assets/login.png";

export const Login: React.FC = () => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center" p="10">
      <Text
        fontSize={30}
        fontWeight={700}
        color="primary.500"
        textAlign="center"
        lineHeight={34}
      >
        {`Despesas Pessoais`}
      </Text>
      <Text color="gray.600" fontSize={20} textAlign="center" margin="4">
        Controle seus gastos mensais e fique mais tranquilo com o seu orçamento.
      </Text>
      <Image source={LoginImage} alt="Login" width="48" height="48" />
    </Flex>
  );
};
