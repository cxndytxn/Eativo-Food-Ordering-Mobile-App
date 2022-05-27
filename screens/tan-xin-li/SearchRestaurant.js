import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import HorizontalRestaurantCard from "../../components/cards/HorizontalRestaurantCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const SearchRestaurant = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const onChangeText = (text) => {
    setSearchText(text);
  };

  onSnapshot(collection(firestore, "restaurants"), (querySnapshot) => {
    const rests = [];
    querySnapshot.forEach((doc) => {
      rests.push(doc.data());
    });
    setRestaurants(rests);
  });

  const filteredRestaurants =
    searchText === ""
      ? restaurants
      : restaurants.filter((restaurant) =>
          restaurant.username.toLowerCase().includes(searchText.toLowerCase())
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
          data={filteredRestaurants}
          renderItem={({ item, index }) => (
            <HorizontalRestaurantCard
              image={item.imageUrl}
              restaurantName={item.username}
              address={item.address}
              ratings={parseFloat(item.ratings).toFixed(1)}
              time={item.time}
              onPress={() =>
                navigation.navigate("DrawerNavigation", {
                  screen: "Restaurant",
                  params: {
                    image: item.imageUrl,
                    restaurantId: item.uid,
                    restaurantName: item.username,
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
