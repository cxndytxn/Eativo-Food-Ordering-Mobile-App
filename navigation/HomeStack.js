import React from "react";
import Home from "./screens/common/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
