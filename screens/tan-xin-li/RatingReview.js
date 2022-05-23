import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ReviewsCard from "../../components/cards/ReviewsCard";
import Spacing from "../../components/views/Spacing";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
];

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const RatingReview = ({ route }) => {
  const { image, restaurantName, address, ratings, time } = route.params;

  const ListHeaderComponent = () => {
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
          <View style={styles.infoSection}>
            <View style={{ flex: 1 }}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>
            <View>
              <View style={styles.ratings}>
                <Text style={styles.ratingsText}>{ratings}</Text>
              </View>
              <Text style={styles.time}>{time} min</Text>
            </View>
          </View>
        </View>
        <Spacing marginBottom={50} />
        <Text style={styles.sectionHeader}>Reviews</Text>
        <Spacing marginBottom={10} />
      </View>
    );
  };

  return (
    <FlatList
      data={Data}
      renderItem={({ item, index }) => (
        <ReviewsCard
          image={item.image}
          dateTime={item.date}
          rating={item.rating}
          review={item.review}
          username={item.username}
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
  verticalRestaurantCard: {
    paddingBottom: 10,
  },
  backgroundImage: {
    height: 220,
    width: "100%",
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

export default RatingReview;
