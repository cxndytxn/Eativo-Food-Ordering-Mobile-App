import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FavouriteCard from "../../components/cards/FavouriteCard";
import { auth, firestore } from "../../firebase";
import NoRecords from "./empty-states/NoRecords";
import NotSignedIn from "./empty-states/NotSignedIn";
import { useIsFocused } from "@react-navigation/native";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Favourite = ({ navigation }) => {
  const [favouriteList, setFavouriteList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (auth.currentUser != null) {
      GetFavourites();
    }
  }, [isFocused])

  const GetFavourites = async () => {
    const list = [];
    const q = await getDocs(
      query(
        collection(firestore, "favourites"),
        where("uid", "==", auth.currentUser.uid)
      )
    );
    if (!q.empty) {
      q.forEach((snapshot) => {
        list.push({
          ...snapshot.data(),
          key: snapshot.id,
        });
        setFavouriteList(list);
      });
    } else {
      setFavouriteList([]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {auth.currentUser != null ? (
        <FlatList
          data={favouriteList}
          renderItem={({ item, index }) => (
            <FavouriteCard
              image={item.imageUrl}
              restaurantName={item.restaurantName}
              price={item.price}
              mealName={item.mealName}
              id={item.key}
              onPress={() =>
                navigation.navigate("DrawerNavigation", {
                  screen: "Meal",
                  params: {
                    image: item.imageUrl,
                    restaurantName: item.restaurantName,
                    price: item.price,
                    mealName: item.mealName,
                    description: item.description,
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
      ) : (
        <NotSignedIn />
      )}
    </View>
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
