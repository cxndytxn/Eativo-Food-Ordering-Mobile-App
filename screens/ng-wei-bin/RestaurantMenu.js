import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MenuMealCard from "../../components/cards/MenuMealCard";
import Spacing from "../../components/views/Spacing";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Ionicons from "react-native-vector-icons/Ionicons";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const RestaurantMenu = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const mealsList = [];

    const q = query(
      collection(firestore, "meals"),
      where("restaurantId", "==", auth.currentUser.uid)
    );
    onSnapshot(q, (meals) => {
      meals.docChanges().forEach((change) => {
        if (change.doc.exists()) {
          mealsList.push({
            ...change.doc.data(),
            key: change.doc.id,
          });
        }
      });
      // meals.forEach((meal) => {
      //     mealsList.push({
      //       ...meal.data(),
      //       key: meal.id,
      //     });
      setMeals(mealsList);

      //});
    });
  }, []);

  const ListHeaderComponent = () => {
    const navigation = useNavigation();
    return (
      <View>
        <Spacing marginBottom={10} />
      </View>
    );
  };

  return (
    <View style={styles.container2}>
      <FlatList
        data={meals}
        renderItem={({ item, index }) => (
          <MenuMealCard
            mealId={item.key}
            restaurantId={auth.currentUser.uid}
            image={item.imageUrl}
            description={item.description}
            mealName={item.name}
            price={item.price}
            greyOut={item.quantity == 0}
            quantity={item.quantity}
            onPress={() =>
              navigation.navigate("RestaurantNavigation", {
                screen: "Edit Menu Item",
                params: {
                  mealId: item.key,
                },
              })
            }
            key={index}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.verticalRestaurantCard}
        ItemSeparatorComponent={VerticalFlatListItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#FFC529",
          borderRadius: 100,
          width: 50,
          position: "absolute",
          bottom: 20,
          right: 20,
          height: 50,
          elevation: 4,
          zIndex: 10,
          shadowColor: "#000000",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Add New Meal")}
      >
        <Ionicons name="add-outline" color={"black"} size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    right: 10,
    left: 10,
    position: "absolute",
    bottom: 10,
  },
  container2: {
    flex: 1,
  },
  addbutton: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
});

export default RestaurantMenu;
