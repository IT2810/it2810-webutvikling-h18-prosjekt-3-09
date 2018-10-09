import React from "react";
import Note from "../Note";
import { View } from "react-native";

export default ({ todoList, deleteMethod, editNote }) =>
  todoList.map(({ data, title }, index) => (
    <View key={index}>
      <Note
        key={index}
        id={index}
        data={data}
        title={title}
        deleteMethod={deleteMethod}
        editNote={() => editNote(index)}
      />
    </View>
  ));
