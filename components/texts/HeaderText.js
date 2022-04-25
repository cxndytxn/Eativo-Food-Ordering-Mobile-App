import { Text, StyleSheet } from "react-native";

const HeaderText = ({ text }) => {
  return <Text style={[styles.headerText, styles.margin]}>{text}</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "700",
  },
  margin: {
    marginVertical: 5,
  },
});

export default HeaderText;
