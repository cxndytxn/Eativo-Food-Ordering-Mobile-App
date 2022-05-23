import React from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import Spacing from "../../components/views/Spacing";

const Meal = ({ route, navigation }) => {
  const { image, mealName, description, price } = route.params;

  return (
    <View>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>RM {parseFloat(price).toFixed(2)}</Text>
        </View>
        <Spacing marginBottom={50} />
        <Text style={styles.sectionHeader}>Remarks</Text>
        <Spacing marginBottom={10} />
        <TextInput
          style={styles.textInput}
          placeholder="I'm allergic to eggs."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 220,
    width: "100%",
  },
  container: {
    marginHorizontal: 10,
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
  },
  price: {
      
  }
});

export default Meal;
