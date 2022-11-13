import { Text, View } from "native-base";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export const HomeScreen: React.FC = () => {
  const { userInfo, signOut } = useAuth();

  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      px={8}
    >
      <Text
        color="gray.700"
        fontSize="3xl"
        fontWeight={600}
        textAlign="center"
      >{`Olá, ${userInfo.name}!`}</Text>

      <Button marginTop={8} onPress={signOut} type="primary">
        Encerrar sessão
      </Button>
    </View>
  );
};
