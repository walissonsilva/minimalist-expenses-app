import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../hooks/useAuth";
import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";

import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "native-base";
import { Text } from "react-native";
import { ExpensesScreen } from "../screens/Expenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddExpense } from "../screens/AddExpense";
import { GraphicsScreen } from "../screens/Graphics";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function AppRoutes() {
  const { colors } = useTheme();
  const { userInfo } = useAuth();

  return userInfo.id ? (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        headerStyle: {
          backgroundColor: colors.emerald[500],
        },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen
        name="App"
        component={TabbedNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Adicionar Despesa" component={AddExpense} />
    </Stack.Navigator>
  ) : (
    <LoginScreen />
  );
}

export const TabbedNavigation = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {
          color: colors.primary[500],
        },
        tabBarStyle: {
          paddingVertical: 6,
        },
        headerStyle: {
          backgroundColor: colors.emerald[500],
        },
        headerTintColor: colors.white,
      }}
    >
      <Tab.Group>
        {/* <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <Feather
              name="home"
              {...props}
              color={props.focused ? theme.colors.primary[500] : props.color}
              size={props.size - 2}
            />
          ),
          tabBarLabel: (props) => (
            <Text
              {...props}
              style={{
                color: props.focused ? theme.colors.primary[500] : props.color,
                fontSize: 10,
              }}
            >
              Home
            </Text>
          ),
        }}
        name="Home"
        component={HomeScreen}
      /> */}
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Feather
                name="list"
                {...props}
                color={props.focused ? colors.emerald[500] : props.color}
                size={props.size - 2}
              />
            ),
            tabBarLabel: (props) => (
              <Text
                {...props}
                style={{
                  color: props.focused ? colors.emerald[500] : props.color,
                  fontSize: 11,
                }}
              >
                Lançamentos
              </Text>
            ),
          }}
          name="Lançamentos"
          component={ExpensesScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Feather
                name="bar-chart-2"
                {...props}
                color={props.focused ? colors.emerald[500] : props.color}
                size={props.size - 2}
              />
            ),
            tabBarLabel: (props) => (
              <Text
                {...props}
                style={{
                  color: props.focused ? colors.emerald[500] : props.color,
                  fontSize: 11,
                }}
              >
                Gráficos
              </Text>
            ),
          }}
          name="Gráficos"
          component={GraphicsScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Feather
                name="user"
                {...props}
                color={props.focused ? colors.emerald[500] : props.color}
                size={props.size - 2}
              />
            ),
            tabBarLabel: (props) => (
              <Text
                {...props}
                style={{
                  color: props.focused ? colors.emerald[500] : props.color,
                  fontSize: 11,
                }}
              >
                Perfil
              </Text>
            ),
          }}
          name="Perfil"
          component={HomeScreen}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
