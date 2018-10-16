import React from "react";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";

export default ({ text, onPress }) => (
  <Button
    large
    rightIcon={{ name: "code" }}
    title={text}
    onPress={onPress}
    backgroundColor={Colors.color1}
    rounded={true}
    accessibilityLabel="Press to add task to list"
    containerViewStyle={{ marginTop: 10 }}
  />
);
