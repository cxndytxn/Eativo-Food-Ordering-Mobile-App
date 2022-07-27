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
import { View, FlatList } from "react-native";
import RestaurantOrderCard from "../../components/cards/RestaurantOrderCard";
import { auth, firestore } from "../../firebase";

const StaffOrders = () => {
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
          where("restaurantId", "==", restaurantId)
        )
      );
      ref.forEach((doc) => {
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
          paddingTop: 20,
        }}
      />
    </View>
  );
};

export default StaffOrders;
