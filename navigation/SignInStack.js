import React from "react";
import SignIn from "../screens/common/SignIn";
import SignUp from "../screens/tan-xin-li/SignUp";
import ForgotPassword from "../screens/common/ForgotPassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SignInStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SignInStack;
