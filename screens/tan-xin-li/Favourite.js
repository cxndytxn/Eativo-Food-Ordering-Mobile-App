import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FavouriteCard from "../../components/cards/FavouriteCard";
import NoRecords from "./empty-states/NoRecords";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    restaurantName: "McDonald's",
    mealName: "McChicken",
    price: 15.5,
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    restaurantName: "McDonald's",
    mealName: "Fillet O' Fish",
    price: 15.5,
  },
];

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Favourite = ({ navigation }) => {
  return (
    <FlatList
      data={Data}
      renderItem={({ item, index }) => (
        <FavouriteCard
          image={item.image}
          restaurantName={item.restaurantName}
          price={item.price}
          mealName={item.mealName}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Meal",
              params: {
                image: item.image,
                restaurantName: item.restaurantName,
                price: item.price,
                mealName: item.mealName,
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
    backgroundColor: "black",
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

export default Favourite;
