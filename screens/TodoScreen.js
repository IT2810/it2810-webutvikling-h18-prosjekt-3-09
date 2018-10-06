import React from 'react';
import { 
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Note from '../components/Note'
import { Icon } from 'react-native-elements';
import { SortableListView } from 'react-native-sortable-listview'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo',
  };

  constructor(props) {
      super(props);
      this.state = {
          inputTitle: '',
          text: 'Placeholder',
          todoList: [
              {
                  title: "Task1",
                  data: "Task number 1"
              },
              {
                title: "Task2",
                data: "Task number 2"
            },
            {
                title: "Task3",
                data: "Task number 3"
            },
          ],
          isEditing: false,
          editText: '',
          editId: 0,
      };
  }

deleteNote = id => console.log(id) || this.setState(({todoList}) =>  ({todoList: todoList.filter((_e, index) => index !== id)}))

editNote = editId =>  {
this.setState({isEditing: true, editId, editText: this.state.todoList[editId].data})
}
  render() {
    const saveEdit = () => {
        const {editId, editText} = this.state
        const todoList = this.state.todoList.slice()
        todoList[editId].data = editText
        this.setState({isEditing: false, todoList})
    }

    const showTodo = this.state.todoList.map(({data, title}, index)  => {
        return (
            <View> 
                <Note id={index} data={data} title={title} 
                deleteMethod={this.deleteNote} 
                editNote = {() => this.editNote(index)} />
            </View>
        )
    })

    const addNote = () => {
       if (this.state.text){
            this.state.todoList.push({title: this.state.inputTitle, 'data': this.state.text})
            this.setState ({todoList: this.state.todoList, text: ''})
        }
        {/* this.setState({
            data: [...this.state.text, {'title':'', 'data': this.state.text}]
        });*/}
    }

    if (this.state.isEditing) {
        return (
            <View style={styles.editView}>
                <TextInput style={styles.input} 
                    onChangeText={ (editText) => this.setState({editText})}
                    value={this.state.editText}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Icon
                    raised
                    name='save'
                    color='#f50'
                    onPress={saveEdit}
                />
            </View>
        )
    }

    if(this.state.addNew) {
        <View style={styles.editView}>
            <TextInput style={styles.input} 
                onChangeText={ (text) => this.setState({text})}
                value={this.state.editText}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TextInput style={styles.input} 
                onChangeText={ (text) => this.setState({text})}
                value={this.state.text}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
            <Icon
                raised
                name='save'
                color='#f50'
                onPress={saveEdit}
            />
        </View>
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                {showTodo}
            </View>
            <TextInput style={styles.input} 
                onChangeText={ (inputTitle) => this.setState({inputTitle})}
                value={this.state.inputTitle}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TextInput style={styles.input} 
                onChangeText={ (text) => this.setState({text})}
                value={this.state.text}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={addNote}
                accessibilityLabel='Press to add task to list'
            >
                 <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
    input: {
      flex: 1,
      backgroundColor: '#fff',
    },
    box: {
        height:100,
        width:100,
        backgroundColor:"skyblue",
    },
    input: {
        paddingTop: 10,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
    },
    addButton: {
        borderWidth:1,
        borderColor:'"rgba(0,0,0,0.2)"',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:100,
        left:5,
        backgroundColor:'#54b2e5',
        borderRadius:100,
        },
    addButtonText: {
        fontSize: 50,
        color: 'white',
        alignItems:'center',
        justifyContent:'center',
    },
})
