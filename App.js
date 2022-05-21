import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import SignIn from "./screens/common/SignIn";
import SignUp from "./screens/tan-xin-li/SignUp";
import Home from "./screens/common/Home";
import ForgotPassword from "./screens/common/ForgotPassword";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen name="Sign In" component={SignIn} />
      <Drawer.Screen name="Sign Up" component={SignUp} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        </Stack.Navigator>
      </SafeAreaProvider>
      <StatusBar backgroundColor="#fff" style="auto" />
      <Toast position="bottom" />
    </NavigationContainer>
  );
};

export default App;
