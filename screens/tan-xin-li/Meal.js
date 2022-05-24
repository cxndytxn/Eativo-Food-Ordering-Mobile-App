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

const Meal = ({ route, navigation }) => {
  const { image, mealName, description, price } = route.params;
  const [total, setTotal] = useState(price);
  const [height, setHeight] = useState("100%");

  const AddToCart = () => {
    if (total <= 0.0) {
      ShowToast();
    } else {
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
            max={10}
            min={0}
            value={1}
            skin="clean"
            textColor="#FFAA3A"
            buttonTextColor="#FFAA3A"
            onChange={(num) => {
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
    color: "#FFAA3A",
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
