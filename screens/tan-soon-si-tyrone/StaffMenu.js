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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  doc,
  collection,
  getDoc,
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

const StaffMenu = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [meals, setMeals] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    FetchStaffs();
  }, [isFocused]);

  const FetchStaffs = async () => {
    const mealsList = [];
    var uid = auth.currentUser?.uid;
    var restaurantId = "";
    const docRef = doc(firestore, "staffs", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      restaurantId = docSnap.data().restaurantId;
      setRestaurantId(restaurantId);
      const q = await getDocs(
        query(
          collection(firestore, "meals"),
          where("restaurantId", "==", restaurantId)
        )
      );
      if (!q.empty) {
        q.forEach((docs) => {
          mealsList.push({
            ...docs.data(),
            key: docs.id,
          });
        });
        setMeals(mealsList);
      }
      // onSnapshot(q, (meals) => {
      //   meals.docChanges().forEach((change) => {
      //     if (change.doc.exists()) {
      //       mealsList.push({
      //         ...change.doc.data(),
      //         key: change.doc.id,
      //       });
      //     }
      //   });
      //   // meals.forEach((meal) => {
      //   //     mealsList.push({
      //   //       ...meal.data(),
      //   //       key: meal.id,
      //   //     });
      //   setMeals(mealsList);

        //});
      //});
    }
  };

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
            restaurantId={restaurantId}
            image={item.imageUrl}
            description={item.description}
            mealName={item.name}
            price={item.price}
            greyOut={item.quantity == 0}
            quantity={item.quantity}
            onPress={() =>
              navigation.navigate("StaffNavigation", {
                screen: "Edit Menu Item",
                params: {
                  type: "staff",
                  mealId: item.key,
                  restaurantId: restaurantId,
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
        onPress={() =>
          navigation.navigate("StaffNavigation", {
            screen: "Add New Meal",
            params: {
              type: "staff",
              restId: restaurantId,
            },
          })
        }
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

export default StaffMenu;

// const StaffMenu = () => {
//   const isFocused = useIsFocused();
//   const [meals, setMeals] = useState([]);

//   const FlatListItemSeparator = () => {
//     return (
//       <View
//         Style={{
//           marginVertical: 10,
//           flex: 1,
//           borderBottomWidth: 1,
//           borderBottomColor: "lightgrey",
//         }}
//       />
//     );
//   };

//   useEffect(() => {
//     FetchMeals();
//   }, [isFocused]);

//   const FetchMeals = async () => {
//     var uid = auth.currentUser?.uid;
//     var restaurantId = "";
//     const docRef = doc(firestore, "staffs", uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const meal = [];
//       restaurantId = docSnap.data().restaurantId;
//       const ref = await getDocs(
//         query(
//           collection(firestore, "meals"),
//           where("restaurantId", "==", restaurantId)
//         )
//       );
//       onSnapshot()
//     }
//   }
// }
