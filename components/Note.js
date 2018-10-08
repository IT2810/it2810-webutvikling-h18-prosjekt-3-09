import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default class Note extends React.Component {
  render() {
    const { id, title, data, deleteMethod, editNote } = this.props;
    return (
      <View id={id} style={styles.note}>
        <Text style={styles.noteTitle}>{title}</Text>
        <Text style={styles.noteText}>{data}</Text>
        <Icon
          name="delete"
          color="#e5547b"
          onPress={() => deleteMethod(id)}
          accessibilityLabel="Press to remove task from list"
          underlayColor="rgba(0,0,0,0)"
        />
        <Icon raised name="edit" color="#f50" onPress={editNote} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
    height: 170,
    padding: 5,
    margin: 2,
    borderWidth: 2
  },
  noteTitle: {
    fontWeight: "bold"
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10
  },
  noteDeleteText: {
    color: "black",
    fontWeight: "bold"
  },
  noteDelete: {
    borderWidth: 1,
    borderColor: '"rgba(0,0,0,0.2)"',
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    left: 5,
    backgroundColor: "#e5547b",
    borderRadius: 20
  }
});
