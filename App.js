import React from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import SignOut from "./screens/common/SignOut";
import Cart from "./screens/tan-xin-li/Cart";
import Order from "./screens/tan-xin-li/Order";
import Favorite from "./screens/tan-xin-li/Favorite";
import Profile from "./screens/tan-xin-li/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderLeftButton from "./components/buttons/HeaderLeftButton";
import { Provider } from "react-native-paper";
import SignInStack from "./navigation/SignInStack";
import SignUpStack from "./navigation/SignUpStack";
import Home from "./screens/common/Home";
import Restaurant from "./screens/tan-xin-li/Restaurant";
import RatingReview from "./screens/tan-xin-li/RatingReview";
import Meal from "./screens/tan-xin-li/Meal";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
        tabBarInactiveTintColor: "#666666",
        tabBarActiveTintColor: "#FFAA3A",
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          drawerItemStyle: { display: "none" },
          headerLeft: () => <HeaderLeftButton />,
        })}
      />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen name="Ratings & Reviews" component={RatingReview} />
      <Stack.Screen name="Meal" component={Meal} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider>
          <Drawer.Navigator
            backBehavior="history"
            screenOptions={{
              swipeEnabled: false,
            }}
          >
            <Drawer.Screen
              name="DrawerNavigation"
              component={StackNavigation}
              options={{
                headerShown: false,
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="Sign In"
              component={SignInStack}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Ionicons
                    name="log-in-outline"
                    size={size}
                    color={"#666666"}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Sign Up"
              component={SignUpStack}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Ionicons
                    name="person-add-outline"
                    size={size}
                    color={"#666666"}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Sign Out"
              component={SignOut}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Ionicons
                    name="log-out-outline"
                    size={size}
                    color={"#666666"}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </Provider>
      </SafeAreaProvider>
      <Toast position="bottom" />
      <StatusBar backgroundColor="#fff" style="auto" />
    </NavigationContainer>
  );
};

const getHomeStackHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Restaurant":
      return "Restaurant";
  }
};

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Cart":
      return "Cart";
    case "Order":
      return "Order";
    case "Favorite":
      return "Favorite";
    case "Profile":
      return "Profile";
  }
};

export default App;
