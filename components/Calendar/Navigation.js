import React from 'react'
import { View, Image, Text, TouchableOpacity } from "react-native"
import PropTypes from 'prop-types'
import {tintColor} from "../../constants/Colors"

const NavigationArrow = ({
  onNavigation, direction, children
}) => {
  return (
    <TouchableOpacity
      onPress={() => onNavigation(direction)}
      >
      <View 
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: tintColor || "#2f95dc",
          position: "relative",
          height: 48,
          minWidth: 48,
          margin: 16,
          padding: 16,
          flex: 1
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

NavigationArrow.propTypes = {
  direction: PropTypes.oneOf([-1, 1, 0]).isRequired,
  onNavigation: PropTypes.func.isRequired
}


const Navigation = ({
  onNavigation, month
}) => {
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <NavigationArrow
        direction={-1}
        onNavigation={onNavigation}
        >
          <Text>{"<-"}</Text>
      </NavigationArrow>
      <NavigationArrow
        direction={0}
        onNavigation={onNavigation}
      >
        <Text>{month.format("YYYY MMM")}</Text>
      </NavigationArrow>
      
      <NavigationArrow
        direction={1}
        onNavigation={onNavigation}
      >
        <Text>{"->"}</Text>
      </NavigationArrow>
    </View>
  )
}


Navigation.propTypes = {onNavigation: PropTypes.func.isRequired}

export default Navigation