import React from "react";
import { View } from "react-native";
import colors from "../../constants/Colors";
import { Icon, Button } from "react-native-elements";

const Navigation = ({ onNavigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 16,
        backgroundColor: colors.color2,
        borderRadius: 64
      }}
    >
      <Icon
        reverse
        raised
        name="keyboard-arrow-left"
        onPress={() => onNavigation(-1)}
      />
      <Button
        title="Today"
        icon={{ name: "event" }}
        backgroundColor="#000"
        rounded
        onPress={() => onNavigation(0)}
      />
      <Icon
        reverse
        raised
        name="keyboard-arrow-right"
        onPress={() => onNavigation(1)}
      />
    </View>
  );
};

export default Navigation;
