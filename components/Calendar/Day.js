import React from "react";
import moment from "moment";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import { Button } from "react-native-elements";

export default ({ value, placeholder, onDayChange, today, hasEvent }) => (
  <Button
    disabled={placeholder}
    containerViewStyle={{
      height: layout.window.width / 7,
      width: layout.window.width / 7,
      opacity: placeholder ? 0.2 : 1,
      marginLeft: 0,
      marginRight: 0,
      flex: 1
    }}
    buttonStyle={{
      flex: 1
    }}
    textStyle={{
      color:
        !hasEvent || placeholder
          ? today
            ? colors.light
            : colors.dark
          : colors.light
    }}
    backgroundColor={
      today ? colors.color5 : hasEvent ? colors.color3 : "transparent"
    }
    onPress={() => onDayChange(value)}
    title={moment(value).format("D")}
  />
);
