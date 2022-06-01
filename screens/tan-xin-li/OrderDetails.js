import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import Spacing from "../../components/views/Spacing";
import Ionicons from "react-native-vector-icons/Ionicons";
import MealCard from "../../components/cards/MealCard";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const OrderDetails = ({ navigation, route }) => {
  const {
    image,
    restaurantName,
    restaurantId,
    price,
    dateTime,
    cartId,
    status,
  } = route?.params;
  const [time, setTime] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [address, setAddress] = useState("");
  const [meals, setMeals] = useState([]);
  const [mealId, setMealId] = useState([]);
  const [unique, setUnique] = useState([]);

  useEffect(() => {
    GetRestaurant();
  }, []);

  const GetRestaurant = async () => {
    const docRef = doc(firestore, "restaurants", restaurantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTime(docSnap.data().time);
      setRatings(docSnap.data().ratings);
      setAddress(docSnap.data().address);
    }
  };

  useEffect(() => {
    GetMeals();
  }, [time, ratings, address]);

  const GetMeals = () => {
    if (cartId.length > 1) {
      cartId.forEach((cart) => {
        GetCarts(cart);
      });
    } else {
      GetCart(cartId[0]);
    }
  };

  const GetCart = async (cart) => {
    const docRef = query(
      collection(firestore, "carts"),
      where(documentId(), "==", cart)
    );
    const snapshots = await getDocs(docRef);
    snapshots.forEach((snapshot) => {
      GetMeal(snapshot);
    });
  };

  const GetCarts = async (cart) => {
    const docRef = query(
      collection(firestore, "carts"),
      where(documentId(), "==", cart)
    );
    const snapshots = await getDocs(docRef);
    snapshots.forEach((snapshot) => {
      setMealId([{ ...snapshot.data(), key: snapshot.id }]);
    });
  };

  useEffect(() => {
    GetMeal();
  }, [mealId]);

  const GetMeal = () => {
    console.log(mealId, "why");
    mealId.forEach((id) => {
      GetItem(id);
    });
  };

  const GetItem = async (id) => {
    console.log(id.mealId);
    const q = doc(firestore, "meals", id.mealId);
    await getDoc(q)
      .then((snap) => {
        if (meals !== undefined) {
          console.log(meals);
          if (!meals.includes(snap.data().mealId))
            setMeals((prev) => [
              ...prev,
              {
                ...id,
                imageUrl: snap.data().imageUrl,
                description: snap.data().description,
              },
            ]);
        } else {
          setMeals([
            {
              ...id,
              imageUrl: snap.data().imageUrl,
              description: snap.data().description,
            },
          ]);
        }
        console.log(meals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={styles.ratings}>
                <Text style={styles.ratingsText}>{time} min</Text>
              </View>
              {/* <Text style={styles.time}>{time} min</Text> */}
            </View>
          </View>
        </View>
        <Spacing marginBottom={50} />
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="restaurant"
              size={24}
              style={{ marginHorizontal: 10 }}
            />
            <Text>{status}</Text>
          </View>
          <Spacing marginBottom={10} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="time-sharp"
              size={24}
              style={{ marginHorizontal: 10 }}
            />
            <Text>{dateTime}</Text>
          </View>
          <Spacing marginBottom={10} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="wallet"
              size={24}
              style={{ marginHorizontal: 10 }}
            />
            <Text>RM {parseFloat(price).toFixed(2)}</Text>
          </View>
        </View>
        <Spacing marginBottom={15} />
      </View>
    );
  };

  useEffect(() => {
    if (meals !== undefined) {
      if (typeof meals !== undefined) {
        setUnique([...new Set(meals.map((data) => data.mealId))]);
        setUnique(
          meals.filter((value, index, _meals) => {
            return (
              _meals.indexOf(
                _meals.find((item) => item.mealId == value.mealId)
              ) === index
            );
          })
        );
      }
      console.log(unique);
    }
  }, [meals]);

  return (
    <FlatList
      data={unique}
      renderItem={({ item, index }) => (
        <MealCard
          image={item.imageUrl}
          description={item.description}
          mealName={item.mealName}
          quantity={item.quantity}
          hideHeart
          restaurantId={item.restaurantId}
          price={Number(item.total / item.quantity).toFixed(2)}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Meal",
              params: {
                image: item.imageUrl,
                mealName: item.mealName,
                description: item.description,
                price: Number(item.total / item.quantity).toFixed(2),
              },
            })
          }
          key={index}
        />
      )}
      keyExtractor={(item, index) => String(index)}
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
    maxWidth: 60,
    padding: 3,
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
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
});

export default OrderDetails;
