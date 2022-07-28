import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import addNewItem from "../screens/ng-wei-bin/AddNewItem";


const RestaurantManagerStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="addNewItem"
        component={addNewItem}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantManagerStack;