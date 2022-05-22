import React from "react";
import SignIn from "../screens/common/SignIn";
import SignUp from "../screens/tan-xin-li/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SignUpStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
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

export default SignUpStack;
