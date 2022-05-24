import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, Image } from "react-native";
import VerticalRestaurantCard from "../../components/cards/VerticalRestaurantCard";
import Spacing from "../../components/views/Spacing";
import HorizontalRestaurantCard from "../../components/cards/HorizontalRestaurantCard";
import { useNavigation } from "@react-navigation/native";

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

const FlatListItemSeparator = () => {
  return <View style={{ marginRight: 10 }} />;
};

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const ListHeaderComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Spacing marginTop={10} />
      <View style={styles.greetingContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.username}>Hello, Erin!</Text>
          <Text style={styles.address}>168, Bukit Bintang, Kuala Lumpur</Text>
        </View>
      </View>
      <Spacing marginBottom={20} />
      <Text style={styles.sectionHeader}>Restaurants Near You</Text>
      <Spacing marginBottom={10} />
      <FlatList
        data={Data}
        renderItem={({ item, index }) => (
          <VerticalRestaurantCard
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
        ItemSeparatorComponent={FlatListItemSeparator}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
      <Spacing marginBottom={20} />
      <Text style={styles.sectionHeader}>All Restaurants</Text>
      <Spacing marginTop={10} />
    </View>
  );
};

const Home = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState("");

  return (
    <FlatList
      data={Data}
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
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalRestaurantCard: {
    paddingVertical: 10,
  },
  greetingContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: "#000000",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    margin: 10,
  },
  username: {
    fontSize: 16,
    color: "#FFAA3A",
    fontWeight: "bold",
  },
  address: {
    fontSize: 12,
    color: "#666666",
  },
});

export default Home;
