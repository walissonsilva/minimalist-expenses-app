import {
  Barlow_300Light,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
  useFonts,
} from "@expo-google-fonts/barlow";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider, StatusBar } from "native-base";
import { AuthProvider } from "./src/hooks/useAuth";
import { FirebaseProvider } from "./src/hooks/useFirebase";
import { AppRoutes } from "./src/routes/app.routes";
import { theme } from "./src/styles/theme";

const queryClient = new QueryClient();

export default function App() {
  let [fontsLoaded] = useFonts({
    Barlow_300Light,
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FirebaseProvider>
            <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>
          </FirebaseProvider>
        </AuthProvider>
      </QueryClientProvider>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>
  );
}
