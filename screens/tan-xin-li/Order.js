import {
  collection,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import OrderCard from "../../components/cards/OrderCard";
import NoRecords from "./empty-states/NoRecords";
import { firestore, auth } from "../../firebase";
import NotSignedIn from "./empty-states/NotSignedIn";
import { useIsFocused } from "@react-navigation/native";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Order = ({ navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (auth.currentUser != null) {
      GetOrders();
    }
  }, [isFocused]);

  const GetOrders = async () => {
    const list = [];
    const q = query(
      collection(firestore, "orders"),
      where("uid", "==", auth.currentUser.uid)
    );
    onSnapshot(q, (querySnapshots) => {
      querySnapshots.forEach((snapshot) => {
        list.push({
          ...snapshot.data(),
          key: snapshot.id,
        });
        setOrderList(list);
      });
    });
  };

  return auth.currentUser != null ? (
    <FlatList
      data={orderList}
      renderItem={({ item, index }) => (
        <OrderCard
          image={item.imageUrl}
          dateTime={item.date + " " + item.time}
          restaurantName={item.restaurantName}
          restaurantId={item.restaurantId}
          price={item.total}
          orderId={item.key}
          status={item.status}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Order Details",
              params: {
                image: item.imageUrl,
                restaurantName: item.restaurantName,
                restaurantId: item.restaurantId,
                price: item.total,
                dateTime: item.date + " " + item.time,
                cartId: item.ids,
                status: item.status,
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
      ListEmptyComponent={NoRecords}
    />
  ) : (
    <NotSignedIn />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 220,
    width: "100%",
  },
  verticalRestaurantCard: {
    paddingBottom: 15,
    paddingTop: 20,
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    width: "90%",
    flexDirection: "row",
    position: "absolute",
    top: -35,
    alignSelf: "center",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    color: "#666666",
    fontSize: 12,
  },
  ratings: {
    borderRadius: 50,
    backgroundColor: "#FFC529",
    maxWidth: 45,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingsText: {
    color: "black",
    fontSize: 12,
    padding: 2,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#666666",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
  },
  absoluteContainer: {
    position: "relative",
  },
});

export default Order;
