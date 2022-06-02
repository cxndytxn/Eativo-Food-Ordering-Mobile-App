import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../views/Spacing";
import Ionicons from "react-native-vector-icons/Ionicons";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import Toast from "react-native-toast-message";

const FavouriteCard = ({
  image,
  restaurantName,
  mealName,
  price,
  onPress,
  style,
  id,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const ToggleFavourite = async () => {
    await deleteDoc(doc(firestore, "favourites", id)).then(
      Toast.show({
        type: "success",
        text1: "You'd removed " + mealName + " from your Favourites List!",
      })
    );
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <View>
          <Spacing marginTop={5} />
          <Text style={styles.restaurantName}>{mealName}</Text>
          <Spacing marginBottom={5} />
          <Text style={styles.address}>By: {restaurantName}</Text>
        </View>
        <Spacing marginTop={5} />
        <Text style={styles.price}>RM {parseFloat(price).toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Ionicons
          name={isClicked ? "heart-outline" : "heart"}
          color="#ff4340"
          size={32}
          style={{ marginEnd: 10 }}
          onPress={() => {
            setIsClicked(!isClicked);
            ToggleFavourite();
          }}
        />
      </TouchableOpacity>
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
    fontSize: 16,
  },
  status: {
    borderRadius: 50,
    backgroundColor: "black",
    textAlign: "center",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
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
});

export default FavouriteCard;
