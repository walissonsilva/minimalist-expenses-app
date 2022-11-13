import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../hooks/useAuth";
import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";

import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "native-base";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  const { userInfo } = useAuth();
  const theme = useTheme();

  return userInfo.id ? (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {
          color: theme.colors.primary[500],
        },
        tabBarStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <Feather
              name="home"
              {...props}
              color={props.focused ? theme.colors.primary[500] : props.color}
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
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <Feather
              name="list"
              {...props}
              color={props.focused ? theme.colors.primary[500] : props.color}
            />
          ),
          tabBarLabel: (props) => (
            <Text
              {...props}
              style={{
                color: props.focused ? theme.colors.primary[500] : props.color,
                fontSize: 11,
              }}
            >
              Lançamentos
            </Text>
          ),
        }}
        name="Lançamentos"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <Feather
              name="bar-chart-2"
              {...props}
              color={props.focused ? theme.colors.primary[500] : props.color}
            />
          ),
          tabBarLabel: (props) => (
            <Text
              {...props}
              style={{
                color: props.focused ? theme.colors.primary[500] : props.color,
                fontSize: 11,
              }}
            >
              Gráficos
            </Text>
          ),
        }}
        name="Gráficos"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <Feather
              name="user"
              {...props}
              color={props.focused ? theme.colors.primary[500] : props.color}
            />
          ),
          tabBarLabel: (props) => (
            <Text
              {...props}
              style={{
                color: props.focused ? theme.colors.primary[500] : props.color,
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
    </Tab.Navigator>
  ) : (
    <LoginScreen />
  );
}
