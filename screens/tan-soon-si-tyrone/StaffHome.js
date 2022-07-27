import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RestaurantOrderCard from "../../components/cards/RestaurantOrderCard";
import { auth, firestore } from "../../firebase";

const StaffHome = () => {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
        }}
      />
    );
  };

  useEffect(() => {
    FetchOrders();
  }, [isFocused]);

  const FetchOrders = async () => {
    var uid = auth.currentUser?.uid;
    var restaurantId = "";
    const docRef = doc(firestore, "staffs", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const order = [];
      restaurantId = docSnap.data().restaurantId;
      const ref = await getDocs(
        query(
          collection(firestore, "orders"),
          where("restaurantId", "==", restaurantId),
          where("status", "==", "Order Received")
        )
      );
      ref.forEach((doc) => {
        order.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      const secondRef = await getDocs(
        query(
          collection(firestore, "orders"),
          where("restaurantId", "==", restaurantId),
          where("status", "==", "In Kitchen")
        )
      );
      secondRef.forEach((doc) => {
        order.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setOrders(order);
    }
  };

  return (
    <View>
      <Text style={styles.sectionHeader}>Incoming Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item, index }) => (
          <RestaurantOrderCard
            orderId={item.key}
            date={item.date}
            time={item.time}
            status={item.status}
            totalPrice={item.total}
            key={index}
          />
        )}
        keyExtractor={(item) => item.index}
        ItemSeparatorComponent={FlatListItemSeparator}
        contentContainerStyle={{
          paddingBottom: 70,
          marginHorizontal: 10,
          paddingTop: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
  },
});

export default StaffHome;
