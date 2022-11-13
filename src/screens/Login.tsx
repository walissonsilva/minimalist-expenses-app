import React from "react";
import { Box, Flex, Image, KeyboardAvoidingView, Text } from "native-base";
import LoginImage from "../assets/login.png";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Platform } from "react-native";

export const Login: React.FC = () => {
  return (
    <KeyboardAvoidingView
      flex={1}
      justifyContent="center"
      alignItems="center"
      px="10"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        paddingX={6}
        paddingY={2}
        rounded="md"
        backgroundColor="white"
        marginBottom={6}
      >
        <Image source={LoginImage} alt="Login" width="48" height="48" />
      </Box>
      <Box>
        <Text
          fontSize={30}
          fontWeight={700}
          color="primary.500"
          textAlign="center"
          lineHeight={34}
        >
          {`Despesas Pessoais`}
        </Text>
        <Text
          color="gray.500"
          fontSize={20}
          textAlign="center"
          margin="4"
          fontWeight={300}
        >
          Controle seus gastos mensais e fique mais tranquilo quanto ao seu
          orçamento
        </Text>
      </Box>

      <Flex width="full" marginTop={6}>
        <Input placeholder="E-mail" />
        <Input marginTop={4} placeholder="Senha" type="password" />

        <Button type="primary" marginTop={6}>
          Login
        </Button>
      </Flex>
    </KeyboardAvoidingView>
  );
};
