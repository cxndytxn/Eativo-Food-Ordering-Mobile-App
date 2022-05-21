import React from "react";
import { View, Text } from "react-native";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";

const ForgotPassword = () => {
  return (
    <View>
      <Text>This is Forgot Password screen.</Text>
      <RoundedTextInput placeholder="Enter your email" secureTextEntry={true} />
    </View>
  );
};

export default ForgotPassword;
