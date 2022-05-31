import React, { useCallback, useEffect, useState } from "react";
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
import { updateDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

const EditMeal = ({ route, navigation }) => {
  const { id, qtt } = route.params;
  const [total, setTotal] = useState(price);
  const [height, setHeight] = useState("100%");
  const [remarks, setRemarks] = useState("");
  const [mealId, setMealId] = useState("");
  const [qty, setQty] = useState(qtt);
  const [image, setImage] = useState(
    "https://kimkirchherr.files.wordpress.com/2020/06/pixabay-silverware-plate.png"
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);

  //   const AddToCart = async () => {
  //     if (total <= 0.0) {
  //       ShowToast();
  //     } else if (auth.currentUser == null) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Please sign in before adding meals to cart!",
  //       });
  //       navigation.navigate("Sign In");
  //     } else {
  //       await updateDoc(collection(firestore, "carts"), {
  //         uid: auth.currentUser.uid,
  //         mealId: mealId,
  //         mealName: mealName,
  //         restaurantId: restaurantId,
  //         quantity: qty,
  //         total: parseFloat(total).toFixed(2),
  //         remarks: remarks,
  //         status: "in-cart",
  //       }).then(async () => {
  //         await updateDoc(doc(firestore, "meals", mealId), {
  //           quantity: parseInt(quantity - qty),
  //         }).then(
  //           Toast.show({
  //             type: "success",
  //             text1: "You'd added " + qty + " " + mealName + " to cart!",
  //           })
  //         );
  //       });
  //     }
  //   };

  useEffect(() => {
    GetDoc();
  }, []);

  const GetDoc = async () => {
    const docRef = doc(firestore, "carts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setQty(docSnap.data().quantity);
      setRemarks(docSnap.data().remarks);
      setMealId(docSnap.data().mealId);
      setTotal(docSnap.data().total);
    }
  };

  useEffect(() => {
    GetMeal();
  }, [mealId]);

  const GetMeal = async () => {
    if (mealId != "") {
      const mealRef = doc(firestore, "meals", mealId);
      const mealSnap = await getDoc(mealRef);
      if (mealSnap.exists()) {
        setImage(mealSnap.data().imageUrl);
        setDescription(mealSnap.data().description);
        setName(mealSnap.data().name);
        setPrice(mealSnap.data().price);
        setQuantity(mealSnap.data().quantity);
      }
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
        <Text style={styles.mealName}>{name}</Text>
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
            value={qty}
            skin="clean"
            textColor="#FFC529"
            buttonTextColor="#FFC529"
            onChange={(num) => {
              setQty(num);
              setTotal(num * price);
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
          <PrimaryButton text="Update" />
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
    backgroundColor: "black",
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
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});

export default EditMeal;
