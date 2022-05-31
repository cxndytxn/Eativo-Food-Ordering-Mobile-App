import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import Spacing from "../../components/views/Spacing";
import InputSpinner from "react-native-input-spinner";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Toast from "react-native-toast-message";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

const Meal = ({ route, navigation }) => {
  const {
    mealId,
    image,
    mealName,
    description,
    price,
    quantity,
    restaurantId,
  } = route.params;
  const [total, setTotal] = useState(price);
  const [height, setHeight] = useState("100%");
  const [remarks, setRemarks] = useState("");
  const [qty, setQty] = useState(1);

  const AddToCart = async () => {
    if (total <= 0.0) {
      ShowToast();
    } else if (auth.currentUser == null) {
      Toast.show({
        type: "error",
        text1: "Please sign in before adding meals to cart!",
      });
      navigation.navigate("Sign In");
    } else {
      await addDoc(collection(firestore, "carts"), {
        uid: auth.currentUser.uid,
        mealId: mealId,
        mealName: mealName,
        restaurantId: restaurantId,
        quantity: qty,
        total: parseFloat(total).toFixed(2),
        remarks: remarks,
        status: "In Cart",
      }).then(async () => {
        await updateDoc(doc(firestore, "meals", mealId), {
          quantity: parseInt(quantity - qty),
        }).then(
          Toast.show({
            type: "success",
            text1: "You'd added " + qty + " " + mealName + " to cart!",
          })
        );
      });
    }
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "The quantity of meal shouldn't be 0!",
    });
  };

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

  return (
    <ScrollView
      contentContainerStyle={[styles.outerContainer, { height: height }]}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <Spacing marginTop={10} />
        <Text style={styles.mealName}>{mealName}</Text>
        <Spacing marginBottom={5} />
        <Text style={styles.description}>{description}</Text>
        <Spacing marginBottom={20} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>RM {parseFloat(price).toFixed(2)}</Text>
          <InputSpinner
            max={quantity}
            min={0}
            value={qty}
            skin="clean"
            textColor="#FFC529"
            buttonTextColor="#FFC529"
            onChange={(num) => {
              setTotal(num * price);
              setQty(num);
            }}
            fontSize={16}
            inputStyle={{ fontWeight: "bold" }}
            width="30%"
          />
        </View>
        <Spacing marginBottom={30} />
        <Text style={styles.sectionHeader}>Remarks</Text>
        <Spacing marginBottom={10} />
        <TextInput
          style={styles.textInput}
          placeholder="I'm allergic to eggs."
          multiline={true}
          numberOfLines={5}
          onChangeText={(remarks) => setRemarks(remarks)}
          value={remarks}
        />
      </View>
      <View style={styles.bottomSheet}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Total: RM {parseFloat(total).toFixed(2)}
        </Text>
        <View>
          <PrimaryButton onPress={AddToCart} text="Add To Cart" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 220,
    width: "100%",
  },
  outerContainer: {
    minHeight: "100%",
    height: "100%",
  },
  container: {
    marginHorizontal: 10,
    width: "94%",
  },
  mealName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "#666666",
  },
  textInput: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    textAlignVertical: "top",
  },
  price: {
    color: "#FFC529",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});

export default Meal;
