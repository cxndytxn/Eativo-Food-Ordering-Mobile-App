import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../views/Spacing";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";

const OrderCard = ({
  image,
  restaurantName,
  restaurantId,
  price,
  dateTime,
  status,
  orderId,
  onPress,
  style,
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const q = query(
      collection(firestore, "feedbacks"),
      where("orderId", "==", orderId)
    );

    const unsubsribe = onSnapshot(q, (querySnapshots) => {
      if (querySnapshots.empty) {
        setIsRated(false);
      } else {
        setIsRated(true);
      }
    });

    return () => {
      unsubsribe();
    };
  }, [isFocused]);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <View>
          <Spacing marginTop={5} />
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <Spacing marginBottom={5} />
          <Text style={styles.address}>{dateTime}</Text>
          <Spacing marginBottom={5} />
          <Text style={styles.status}>{status}</Text>
        </View>
        <Spacing marginTop={5} />
        <Text style={styles.price}>RM {parseFloat(price).toFixed(2)}</Text>
      </View>
      {status == "Picked Up" && isRated == false ? (
        <TouchableOpacity
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Ionicons
            name={"star"}
            color="#FFC529"
            size={30}
            style={{ marginEnd: 10 }}
            onPress={() =>
              navigation.navigate("DrawerNavigation", {
                screen: "Feedback",
                params: {
                  image: image,
                  restaurantId: restaurantId,
                  restaurantName: restaurantName,
                  price: price,
                  dateTime: dateTime,
                  status: status,
                  orderId: orderId,
                },
              })
            }
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    borderRadius: 50,
    color: "#FFC529",
    fontWeight: "bold",
    textAlign: "center",
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

export default OrderCard;
