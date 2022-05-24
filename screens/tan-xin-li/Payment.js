import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput } from "react-native";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Spacing from "../../components/views/Spacing";

const Payment = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");

  return (
    <View style={styles.container}>
      <Spacing marginBottom={20} />
      <Image
        source={require("../../assets/images/card_alt.jpg")}
        style={styles.image}
      />
      <Spacing marginBottom={30} />
      <View style={styles.infoContainer}>
        <Text style={styles.bodyText}>Card Number</Text>
        <Spacing marginBottom={10} />
        <TextInput
          style={styles.textInput}
          placeholder={"Card Number"}
          onChangeText={(num) => setCardNumber(num)}
          maxLength={16}
          keyboardType="numeric"
          textContentType="creditCardNumber"
        />
        <Spacing marginBottom={20} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.bodyText}>Expiration Date</Text>
            <Spacing marginBottom={10} />
            <TextInput
              style={styles.textInput}
              placeholder={"Expiration Date"}
              maxLength={5}
              value={date}
              keyboardType="numeric"
              textContentType="creditCardNumber"
              onChangeText={(text) => {
                setDate(
                  text.length === 2 && !text.includes("/")
                    ? `${text.substring(0, 2)}/${text.substring(2)}`
                    : text
                );
              }}
            />
          </View>
          <Spacing marginRight={10} />
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.bodyText}>CVV</Text>
            <Spacing marginBottom={10} />
            <TextInput
              style={styles.textInput}
              placeholder={"CVV"}
              keyboardType="numeric"
              textContentType="creditCardNumber"
              maxLength={4}
            />
          </View>
        </View>
        <Spacing marginBottom={30} />
        <PrimaryButton
          text={"Submit"}
          onPress={() => navigation.navigate("Cart", { post: cardNumber })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "lightgrey",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  image: {
    borderRadius: 200,
    maxHeight: 150,
    maxWidth: 150,
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "92%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bodyText: {
    width: "100%",
    maxWidth: 350,
    fontSize: 14,
  },
});

export default Payment;
