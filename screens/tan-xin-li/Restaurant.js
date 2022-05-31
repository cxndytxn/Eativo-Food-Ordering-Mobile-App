import React, { useEffect, useState } from "react";
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
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Restaurant = ({ navigation, route }) => {
  const {
    image,
    restaurantName,
    restaurantId,
    address,
    ratings,
    time,
    contactNumber,
    email,
  } = route.params;
  const [meals, setMeals] = useState([]);
  const [isHearted, setIsHearted] = useState(false);

  useEffect(() => {
    const mealsList = [];

    const GetFavorites = async (meal) => {
      const q = query(
        collection(firestore, "favourites"),
        where("uid", "==", auth.currentUser.uid),
        where("restaurantId", "==", restaurantId),
        where("mealId", "==", meal.id)
      );
      const snapshots = await getDocs(q);
      if (snapshots.empty == true) {
        setIsHearted(false);
        mealsList.push({
          ...meal.data(),
          key: meal.id,
          isHearted: isHearted,
          isSaved: false,
        });
      } else {
        setIsHearted(true);
        mealsList.push({
          ...meal.data(),
          key: meal.id,
          isHearted: isHearted,
          isSaved: true,
        });
      }
      setMeals(mealsList);
      console.log(meals);
    };

    const q = query(
      collection(firestore, "meals"),
      where("restaurantId", "==", restaurantId)
    );
    onSnapshot(q, (meals) => {
      meals.forEach((meal) => {
        GetFavorites(meal);
      });
    });
  }, []);

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
                screen: "Restaurant Details",
                params: {
                  image: image,
                  restaurantName: restaurantName,
                  restaurantId: restaurantId,
                  address: address,
                  ratings: ratings,
                  time: time,
                  contactNumber: contactNumber,
                  email: email,
                },
              })
            }
          >
            <View style={{ flex: 1, maxWidth: "90%" }}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.ratings}>
                <Text style={styles.ratingsText}>
                  {parseFloat(ratings).toFixed(1)}
                </Text>
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
      data={meals}
      renderItem={({ item, index }) => (
        <MealCard
          mealId={item.key}
          restaurantId={item.restaurantId}
          image={item.imageUrl}
          description={item.description}
          mealName={item.name}
          price={item.price}
          greyOut={item.quantity == 0}
          quantity={item.quantity}
          isHearted={item.isHearted}
          setIsHearted={setIsHearted}
          isSaved={item.isSaved}
          onPress={() =>
            item.quantity != 0
              ? navigation.navigate("DrawerNavigation", {
                  screen: "Meal",
                  params: {
                    mealId: item.key,
                    image: item.imageUrl,
                    mealName: item.name,
                    description: item.description,
                    price: item.price,
                    quantity: item.quantity,
                    restaurantId: item.restaurantId,
                  },
                })
              : Toast.show({
                  type: "error",
                  text1: item.name + " is out of stock!",
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
    backgroundColor: "#FFC529",
    maxWidth: 45,
    maxHeight: 25,
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

export default Restaurant;
