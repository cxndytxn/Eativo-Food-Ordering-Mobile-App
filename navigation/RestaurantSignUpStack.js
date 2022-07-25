import React from "react";
import SignIn from "../screens/common/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantSignUp from "../screens/ng-wei-bin/RestaurantSignUp";

const RestaurantSignUpStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={RestaurantSignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantSignUpStack;