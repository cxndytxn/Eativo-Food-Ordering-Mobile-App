import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import StarRating from "react-native-star-rating";
import Spacing from "../views/Spacing";

const ReviewsCard = ({ image, username, rating, review, dateTime }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.dateTime}>{dateTime}</Text>
          </View>
          <Spacing marginBottom={5} />
          <StarRating
            disabled={true}
            maxStars={5}
            fullStarColor={"#FFC529"}
            rating={rating}
            starSize={20}
            emptyStarColor="lightgrey"
            containerStyle={{ width: "40%" }}
          />
          <Spacing marginBottom={5} />
          <Text style={styles.review}>{review}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    color: "#FFC529",
    fontWeight: "bold",
  },
  review: {
    color: "#666666",
  },
  dateTime: {
    color: "#999999",
    fontSize: 12,
  },
});

export default ReviewsCard;
