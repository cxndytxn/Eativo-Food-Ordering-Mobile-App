import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../views/Spacing";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import Toast from "react-native-toast-message";

const MealCard = ({
  mealId,
  restaurantId,
  image,
  mealName,
  description,
  price,
  onPress,
  style,
  quantity,
  greyOut,
  isHearted,
  setIsHearted,
  hideHeart,
  isSaved,
}) => {
  const [hearted, setHearted] = useState(isSaved);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const GetRestaurant = async () => {
      const q = doc(firestore, "restaurants", restaurantId);
      const snapshot = await getDoc(q);
      setRestaurantName(snapshot.data().username);
    };
    console.log(hearted);
    GetRestaurant();

    return () => GetRestaurant();
  });

  const ToggleHeart = async () => {
    if (hearted) {
      const q = await getDocs(
        query(
          collection(firestore, "favourites"),
          where("uid", "==", auth.currentUser.uid),
          where("mealId", "==", mealId),
          where("restaurantId", "==", restaurantId)
        )
      );
      q.forEach((snapshot) => {
        DeleteDoc(snapshot);
      });
    } else {
      await addDoc(collection(firestore, "favourites"), {
        uid: auth.currentUser.uid,
        restaurantId: restaurantId,
        mealId: mealId,
        imageUrl: image,
        mealName: mealName,
        restaurantName: restaurantName,
        price: price,
        description: description,
      }).then(
        Toast.show({
          type: "success",
          text1: "You'd added " + mealName + " to Favourite List!",
        })
      );
    }
  };

  const DeleteDoc = async (snapshot) => {
    await deleteDoc(doc(firestore, "favourites", snapshot.id)).then(
      Toast.show({
        type: "success",
        text1: "You'd removed " + mealName + " from Favourites List!",
      })
    );
  };

  return (
    <TouchableOpacity
      style={[style, { opacity: greyOut ? 0.3 : 1 }]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <View>
            <Spacing marginTop={5} />
            <Text style={styles.restaurantName}>{mealName}</Text>
            <Spacing marginBottom={5} />
            <Text style={styles.address} numberOfLines={3}>
              {description}
            </Text>
          </View>
          <Spacing marginTop={5} />
          <Text style={styles.quantity}>Remanining Quantity:{quantity}</Text>
          <Text style={styles.price}>Pirce: RM {parseFloat(price).toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 110,
    borderRadius: 20,
    marginRight: 10,
  },
  mealName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#666666",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    color: "#FFC529",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "space-between",
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "#666666",
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "grey",
    opacity: 0.3,
  },
  quantity: {
    fontSize: 14,
    color: "#666666",
  },
});

export default MealCard;