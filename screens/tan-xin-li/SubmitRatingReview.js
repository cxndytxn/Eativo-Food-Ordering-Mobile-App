import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import Spacing from "../../components/views/Spacing";
import StarRating from "react-native-star-rating";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SubmitRatingReview = ({ navigation, route }) => {
  const { image, restaurantName, price, dateTime, status } = route?.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("Rate Me 👋");
  const [height, setHeight] = useState("100%");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setHeight("115%");
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setHeight("100%");
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const OnChangeRating = (num) => {
    setRating(num);
    OnChangeReview(num);
  };

  const OnChangeReview = (num) => {
    switch (num) {
      case 0:
        return;
      case 1:
        return setReview("Worst 😖");
      case 2:
        return setReview("Bad ☹️");
      case 3:
        return setReview("Neutral 😐");
      case 4:
        return setReview("Good 😊");
      case 5:
        return setReview("Great 😍");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={(styles.outerContainer, { height: height })}
    >
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
            <Text style={styles.address}>address</Text>
          </View>
          <View>
            <View style={styles.ratings}>
              <Text style={styles.ratingsText}>ratings</Text>
            </View>
            <Text style={styles.time}>time min</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Spacing marginBottom={50} />
      <Text style={styles.sectionHeader}>Ratings</Text>
      <Spacing marginTop={10} />
      <Text style={styles.review}>{review}</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        fullStarColor={"#FFAA3A"}
        rating={rating}
        animation="tada"
        emptyStarColor="lightgrey"
        selectedStar={(num) => OnChangeRating(num)}
        containerStyle={{ width: "60%", alignSelf: "center", margin: 10 }}
      />
      <Spacing marginBottom={20} />
      <Text style={styles.sectionHeader}>Reviews</Text>
      <Spacing marginBottom={10} />
      <TextInput
        style={styles.textInput}
        placeholder="The meals were great!"
        multiline={true}
        numberOfLines={5}
      />
      <Spacing marginBottom={20} />
      <View style={{ alignItems: "center" }}>
        <PrimaryButton text="Submit" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  backgroundImage: {
    height: 220,
    width: "100%",
  },
  textInput: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 10,
    textAlignVertical: "top",
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
  review: {
    fontWeight: "bold",
    color: "#FFAA3A",
    fontSize: 22,
    textAlign: "center",
  },
});

export default SubmitRatingReview;
