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
import RestOrderCard from "../../components/cards/RestOrderCard";
import { auth, firestore } from "../../firebase";

const RestaurantOrders = () => {
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
    try{
    var uid = auth.currentUser?.uid;
    var restaurantId = "";
    const docRef = doc(firestore, "restaurants", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const order = [];
      //restaurantId = docSnap.data().restaurantId;
      restaurantId=auth.currentUser.uid;
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
    }}catch(error){
      console.log(erorr);
    }
    
  };

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item, index }) => (
          <RestOrderCard
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

export default RestaurantOrders;
