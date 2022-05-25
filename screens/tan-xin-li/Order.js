import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import OrderCard from "../../components/cards/OrderCard";
import NoRecords from "./empty-states/NoRecords";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    restaurantName: "McDonald's",
    dateTime: "10-05-2022 02:45 PM",
    status: "Order Received",
    price: 15.5,
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    restaurantName: "McDonald's",
    dateTime: "10-05-2022 02:45 PM",
    status: "Picked Up",
    price: 15.5,
  },
];

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Order = ({ navigation }) => {
  return (
    <FlatList
      data={Data}
      renderItem={({ item, index }) => (
        <OrderCard
          image={item.image}
          dateTime={item.dateTime}
          restaurantName={item.restaurantName}
          price={item.price}
          status={item.status}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Order Details",
              params: {
                image: item.image,
                restaurantName: item.restaurantName,
                price: item.price,
                dateTime: item.dateTime,
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
    backgroundColor: "#FFAA3A",
    maxWidth: 45,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingsText: {
    color: "white",
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
