import { Box, Flex, Image, KeyboardAvoidingView, Text } from "native-base";
import React from "react";
import { Platform } from "react-native";
import LoginImage from "../assets/login.png";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase.config";
import { useAuth } from "../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();
initializeApp(firebaseConfig);

export const LoginScreen = () => {
  const { signInWithGoogle, isLoggingIn } = useAuth();

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
        <Image source={LoginImage} alt="Login" width="40" height="40" />
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
          fontSize={18}
          textAlign="center"
          margin="4"
          fontWeight={300}
        >
          Controle seus gastos mensais e fique mais tranquilo quanto ao seu
          orçamento
        </Text>
      </Box>

      <Flex width="full" marginTop={6}>
        <Input placeholder="E-mail" textContentType="emailAddress" />
        <Input marginTop={4} placeholder="Senha" type="password" />

        <Button type="primary" marginTop={6}>
          Login
        </Button>
      </Flex>

      <Box width="full">
        <Text color="gray.400" marginY="4" textAlign="center">
          ou
        </Text>

        <Button
          type="outline"
          onPress={async () => await signInWithGoogle()}
          isLoading={isLoggingIn}
        >
          <Flex flexDir="row" alignItems="center">
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png",
              }}
              width={4}
              height={4}
              alt="Logo do Google"
            />
            <Text
              color="gray.500"
              marginLeft="3"
              fontSize="md"
              fontWeight={600}
            >
              Login com o Google
            </Text>
          </Flex>
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
};
