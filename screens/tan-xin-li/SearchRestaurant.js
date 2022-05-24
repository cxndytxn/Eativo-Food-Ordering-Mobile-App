import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import HorizontalRestaurantCard from "../../components/cards/HorizontalRestaurantCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    restaurantName: "McDonald's",
    address: "Bkt Bintang, Kuala Lumpur",
    ratings: 4.5,
    time: 25,
  },
  {
    image:
      "https://www.restaurant-hospitality.com/sites/restaurant-hospitality.com/files/styles/article_featured_standard/public/Kensfoods_breakoutflavors_690784532.jpg?itok=DkJdjGlZ",
    restaurantName: "The Italian Flavor",
    address: "Bkt Bintang, Kuala Lumpur",
    ratings: 4.5,
    time: 25,
  },
  {
    image:
      "https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg",
    restaurantName: "Burger Scientist",
    address: "Bkt Bintang, Kuala Lumpur",
    ratings: 4.5,
    time: 25,
  },
];

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const SearchRestaurant = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const onChangeText = (text) => {
    setSearchText(text);
  };

  const filteredRestaurant =
    searchText === ""
      ? Data
      : Data.filter((restaurant) =>
          restaurant.restaurantName
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );

  return (
    <SafeAreaView>
      <View>
        <Searchbar
          value={searchText}
          onChangeText={(text) => onChangeText(text)}
          style={styles.searchBar}
          selectionColor={"#FFAA3A"}
          placeholder="Search here..."
        />
        <FlatList
          data={filteredRestaurant}
          renderItem={({ item, index }) => (
            <HorizontalRestaurantCard
              image={item.image}
              restaurantName={item.restaurantName}
              address={item.address}
              ratings={item.ratings}
              time={item.time}
              onPress={() =>
                navigation.navigate("DrawerNavigation", {
                  screen: "Restaurant",
                  params: {
                    image: item.image,
                    restaurantName: item.restaurantName,
                    address: item.address,
                    ratings: item.ratings,
                    time: item.time,
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
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalRestaurantCard: {
    paddingBottom: 15,
  },
  searchBar: {
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: -5,
  },
});

export default SearchRestaurant;
