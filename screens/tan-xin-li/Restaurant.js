import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MealCard from "../../components/cards/MealCard";
import Spacing from "../../components/views/Spacing";
import { useNavigation } from "@react-navigation/native";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    mealName: "Aglio Olio Spaghetti",
    description: "A signature dish from The Italian Flavor.",
    price: 15.5,
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    mealName: "Aglio Olio Spaghetti",
    description: "A signature dish from The Italian Flavor.",
    price: 15.5,
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    mealName: "Aglio Olio Spaghetti",
    description: "A signature dish from The Italian Flavor.",
    price: 15.5,
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    mealName: "Aglio Olio Spaghetti",
    description: "A signature dish from The Italian Flavor.",
    price: 15.5,
  },
];

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Restaurant = ({ navigation, route }) => {
  const { image, restaurantName, address, ratings, time } = route.params;

  const ListHeaderComponent = () => {
    const navigation = useNavigation();
    return (
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.absoluteContainer}>
          <TouchableOpacity
            style={styles.infoSection}
            onPress={() =>
              navigation.navigate("DrawerNavigation", {
                screen: "Ratings & Reviews",
                params: {
                  image: image,
                  restaurantName: restaurantName,
                  address: address,
                  ratings: ratings,
                  time: time,
                },
              })
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>
            <View>
              <View style={styles.ratings}>
                <Text style={styles.ratingsText}>{parseFloat(ratings).toFixed(1)}</Text>
              </View>
              <Text style={styles.time}>{time} min</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Spacing marginBottom={50} />
        <Text style={styles.sectionHeader}>Meals</Text>
        <Spacing marginBottom={10} />
      </View>
    );
  };

  return (
    <FlatList
      data={Data}
      renderItem={({ item, index }) => (
        <MealCard
          image={item.image}
          description={item.description}
          mealName={item.mealName}
          price={item.price}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Meal",
              params: {
                image: item.image,
                mealName: item.mealName,
                description: item.description,
                price: item.price,
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
  backgroundImage: {
    height: 220,
    width: "100%",
  },
  verticalRestaurantCard: {
    paddingBottom: 10,
  },
  infoSection: {
    elevation: 4,
    shadowColor: "#000000",
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

export default Restaurant;
