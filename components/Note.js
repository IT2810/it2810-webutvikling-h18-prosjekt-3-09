import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Card, Button, Divider } from "react-native-elements";
import Colors from "../constants/Colors";

export default class Note extends Component {
  render() {
    const { id, title, data, deleteMethod, editNote } = this.props;
    return (
      <Card containerStyle={{ borderRadius: 6 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View />
          <Text style={{ fontWeight: "bold", flexGrow: 1 }}>{title}</Text>
          <Icon
            name="delete"
            color="#e5547b"
            onPress={() => deleteMethod(id)}
            accessibilityLabel="Press to remove task from list"
            underlayColor="rgba(0,0,0,0)"
          />
        </View>
        <Divider
          style={{
            backgroundColor: Colors.lightgrey,
            marginTop: 5,
            marginBottom: 5
          }}
        />
        <Text style={{ marginBottom: 10 }}>{data}</Text>

        <Icon size={12} raised name="edit" color="#f50" onPress={editNote} />
      </Card>
    );
  }
}

const styles = StyleSheet.create({});
