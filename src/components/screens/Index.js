import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import LoginScreen from "./LoginScreen/LoginScreen";
import MenuScreen from "./MenuInicial/MenuScreen";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
