import React from "react";
import { Flex, Image, Text } from "native-base";
import LoginImage from "../assets/login.png";

export const Login: React.FC = () => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Text
        fontSize={36}
        fontWeight={700}
        color="primary.500"
        textAlign="center"
      >
        {`Bem-vindo(a) ao\n Minhas Despesas!`}
      </Text>
      <Image source={LoginImage} alt="Login" width={40} height={40} />
    </Flex>
  );
};
