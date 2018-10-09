import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  Icon,
  Button,
  Divider,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import Note from "../components/Note";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import Colors from "../constants/Colors";
import { withStore } from "../components/Store";

class TodoScreen extends Component {
  static navigationOptions = {
    title: "Todo"
  };

  constructor(props) {
    super(props);
    this.state = {
      inputTitle: "",
      text: "",
      todoList: [],
      isEditing: false,
      editText: "",
      editId: -1,
      addNew: false
    };
  }

  async componentDidMount() {
    try {
      const savedData = await this.props.actions.getItem("todoList"); // datakey is either string of 'todo' or 'manager', essentially the key of the data where you store it in AsyncStorage
      this.setState({ todoList: savedData || [] }); // If no data was found in AsyncStorage, set an empty array
      console.log("successfully mounted");
    } catch (error) {
      sendNotification("error", error); // To give error feedback
    }
  }

  updateData = async data => {
    try {
      this.setState({ data: data });
      await this.props.actions.setItem("todoList", data);
    } catch (error) {
      sendNotification("error", error);
    }
  };

  deleteNote = id => {
    console.log(id) ||
      this.setState(({ todoList }) => ({
        todoList: todoList.filter((_e, index) => index !== id)
      }));
    this.updateData(this.state.todoList);
  };

  editNote = editId => {
    this.setState({
      isEditing: true,
      editId,
      editText: this.state.todoList[editId].data
    });
  };
  saveEdit = () => {
    const { editId, editText } = this.state;
    const todoList = this.state.todoList.slice();
    todoList[editId].data = editText;
    this.setState({ isEditing: false, todoList });
    this.updateData(this.state.todoList);
  };

  addNote = addNew => {
    const { text: data, todoList, inputTitle: title } = this.state;
    if (data) {
      todoList.push({
        title,
        data
      });
      this.setState({ todoList: this.state.todoList, text: "", addNew });
      this.updateData(this.state.todoList);
    }
  };

  handleTextChange = text => this.setState({ text });

  createMode = enable => this.setState({ addNew: enable });
  // LAG HANDLE FUNKSJONER FOR THIS.SETSTATE
  render() {
    const {
      isEditing,
      editText,
      addNew,
      inputTitle,
      text,
      todoList
    } = this.state;

    if (isEditing) {
      return (
        <View>
          <FormLabel labelStyle={styles.labelStyle}>Edit your todo</FormLabel>
          <FormInput
            placeholder="Edit todo"
            value={editText}
            onChangeText={editText => this.setState({ editText })}
          />
          <AddTodo text="Save edit" onPress={this.saveEdit} />
        </View>
      );
    }

    if (addNew) {
      return (
        <View>
          <FormLabel labelStyle={styles.labelStyle}>Title</FormLabel>
          <FormInput
            placeholder="Enter title"
            value={inputTitle}
            onChangeText={inputTitle => this.setState({ inputTitle })}
          />
          <Divider style={styles.lightDivider} />
          <FormLabel labelStyle={styles.labelStyle}>Todo</FormLabel>
          <FormInput
            placeholder="What needs doing?"
            value={text}
            onChangeText={text => this.setState({ text })}
          />
          <Divider style={styles.lightDivider} />
          <AddTodo text="Save todo" onPress={() => this.addNote(false)} />
        </View>
      );
    }
    return (
      <ScrollView>
        <AddTodo text="Add new todo" onPress={() => this.createMode(true)} />
        <Divider
          style={{
            backgroundColor: Colors.dark,
            marginTop: 10,
            marginBottom: 20
          }}
        />
        <View>
          <TodoList
            todoList={todoList}
            deleteMethod={this.deleteNote}
            editNote={this.editNote}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withStore(TodoScreen);

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 25,
    textDecorationLine: "underline",
    color: Colors.dark
  },
  inputStyle: { fontSize: 14 },
  lightDivider: {
    backgroundColor: Colors.lightgrey,
    marginTop: 5,
    marginBottom: 5
  }
});
