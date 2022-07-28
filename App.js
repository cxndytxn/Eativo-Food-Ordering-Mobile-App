import React from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import SignOut from "./screens/common/SignOut";
import Cart from "./screens/tan-xin-li/Cart";
import Order from "./screens/tan-xin-li/Order";
import Favorite from "./screens/tan-xin-li/Favourite";
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
import HeaderRightButton from "./components/buttons/HeaderRightButton";
import SearchRestaurant from "./screens/tan-xin-li/SearchRestaurant";
import Payment from "./screens/tan-xin-li/Payment";
import OrderDetails from "./screens/tan-xin-li/OrderDetails";
import SubmitRatingReview from "./screens/tan-xin-li/SubmitRatingReview";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { View } from "react-native";
import EditMeal from "./screens/tan-xin-li/EditMeal";
import Map from "./screens/tan-xin-li/Map";
import RestaurantHome from "./screens/ng-wei-bin/RestaurantHome";
import StaffHome from "./screens/tan-soon-si-tyrone/StaffHome";
import RestaurantOrders from "./screens/ng-wei-bin/RestaurantOrders";
import RestaurantMenu from "./screens/ng-wei-bin/RestaurantMenu";
import RestaurantStaffs from "./screens/ng-wei-bin/RestaurantStaffs";
import RestaurantProfile from "./screens/ng-wei-bin/RestaurantProfile";
import StaffOrders from "./screens/tan-soon-si-tyrone/StaffOrders";
import StaffMenu from "./screens/tan-soon-si-tyrone/StaffMenu";
import StaffProfile from "./screens/tan-soon-si-tyrone/StaffProfile";
import RestaurantSignUpStack from "./navigation/RestaurantSignUpStack";
import AddNewItem from "./screens/ng-wei-bin/AddNewItem";
import EditMenuItem from "./screens/ng-wei-bin/EditMenuItem";
import StaffOrderDetails from "./screens/tan-soon-si-tyrone/StaffOrderDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------Xin Li-------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Favourite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
        tabBarInactiveTintColor: "#666666",
        tabBarActiveTintColor: "#FFC529",
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
        name="Search"
        component={SearchRestaurant}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favourite"
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
          headerRight: () => <HeaderRightButton />,
        })}
      />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen name="Restaurant Details" component={RatingReview} />
      <Stack.Screen name="Meal" component={Meal} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Search Restaurant" component={SearchRestaurant} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Order Details" component={OrderDetails} />
      <Stack.Screen name="Feedback" component={SubmitRatingReview} />
      <Stack.Screen name="Sign Out" component={SignOut} />
      <Stack.Screen name="Edit Meal" component={EditMeal} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1 }}>
        <DrawerItem
          label="Sign Out"
          icon={({ focused, color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={"#666666"} />
          )}
          onPress={() => {
            var user = auth.currentUser;
            if (user != null) {
              signOut(auth);
              props.navigation.navigate("Sign Out");
            } else {
              Toast.show({
                type: "error",
                text1: "You're not signed in!",
              });
            }
          }}
          style={{ flex: 1 }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------Wei Bin------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

const RestaurantStack = () => {
  return (
    <Stack.Navigator initialRouteName="RestaurantTab">
      <Stack.Screen
        name="RestaurantTab"
        component={RestaurantTab}
        options={({ route }) => ({
          headerTitle: getRestaurantHeader(route),
          drawerItemStyle: { display: "none" },
          headerLeft: () => <HeaderLeftButton />,
        })}
      />
      <Stack.Screen name="Add New Meal" component={AddNewItem} />
      <Stack.Screen name="Edit Menu Item" component={EditMenuItem} />
    </Stack.Navigator>
  );
};

const RestaurantTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Restaurant Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Staffs") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
        tabBarInactiveTintColor: "#666666",
        tabBarActiveTintColor: "#FFC529",
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={RestaurantHome}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={RestaurantOrders}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={RestaurantMenu}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Staffs"
        component={RestaurantStaffs}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={RestaurantProfile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------Tyrone-------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

const StaffStack = () => {
  return (
    <Stack.Navigator initialRouteName="StaffTab">
      <Stack.Screen
        name="StaffTab"
        component={StaffTab}
        options={({ route }) => ({
          headerTitle: getStaffHeader(route),
          drawerItemStyle: { display: "none" },
          headerLeft: () => <HeaderLeftButton />,
        })}
      />
      <Stack.Screen name="Order Details" component={StaffOrderDetails} />
    </Stack.Navigator>
  );
};

const StaffTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
        tabBarInactiveTintColor: "#666666",
        tabBarActiveTintColor: "#FFC529",
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={StaffHome}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={StaffOrders}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={StaffMenu}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StaffProfile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------App.Js-------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

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
            drawerContent={(props) => <DrawerContent {...props} />}
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
              name="RestaurantNavigation"
              component={RestaurantStack}
              options={{
                headerShown: false,
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="StaffNavigation"
              component={StaffStack}
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
              name="Restaurant Sign Up"
              component={RestaurantSignUpStack}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Ionicons name="cafe-outline" size={size} color={"#666666"} />
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

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Search":
      return "Search Restaurants";
    case "Orders":
      return "Orders";
    case "Favourite":
      return "Favourite";
    case "Profile":
      return "Profile";
  }
};

const getRestaurantHeader = (route) => {
  console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Orders":
      return "Orders";
    case "Menu":
      return "Menu";
    case "Staffs":
      return "Staffs";
    case "Profile":
      return "Profile";
  }
};

const getStaffHeader = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Orders":
      return "Orders";
    case "Menu":
      return "Menu";
    case "Profile":
      return "Profile";
  }
};

export default App;
