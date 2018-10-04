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

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo',
  };

  constructor(props) {
      super(props);
      this.state = {
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
      };
  }
  deleteNote(id) {
    this.state.todoList.splice(id, 1)
    this.setState({ todoList: this.state.todoList})
}
  render() {

    const showTodo = this.state.todoList.map(({data, title}, index)  => {
        return (
            <View> 
                <Note id={index} data={data} title={title} deleteMethod={() => this.deleteNote(index)} />
            </View>
        )
    })

    const addNote = () => {
       if (this.state.text){
            this.state.todoList.push({title: 'Placeholder', 'data': this.state.text})
            this.setState ({todoList: this.state.todoList})
            this.setState ({ text: ''});
        }
        {/* this.setState({
            data: [...this.state.text, {'title':'', 'data': this.state.text}]
        });*/}
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} 
                onChangeText={ (text) => this.setState({text})}
                value={this.state.text}
                underlineColorAndroid={'rgba(0,0,0,0)'}
            />
            <ScrollView>
                {showTodo}
            </ScrollView>
            <TouchableOpacity
                style={styles.addButton}
                onPress={addNote}
                accessibilityLabel='Press to add taskk to list'
            >
                 <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
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
