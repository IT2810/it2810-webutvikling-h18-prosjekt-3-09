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
import { withStore } from '../components/Store';

class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo',
  };

  constructor(props) {
      super(props);
      this.state = {
          inputTitle: '',
          text: '',
          todoList: [],
          isEditing: false,
          editText: '',
          editId: -1,
      };
  }

  async componentDidMount() {
    try {
        const savedData = await this.props.actions.getItem("todoList") // datakey is either string of 'todo' or 'manager', essentially the key of the data where you store it in AsyncStorage
        this.setState({todoList: savedData || []}) // If no data was found in AsyncStorage, set an empty array
        console.log("successfully mounted")
  } catch (error) {
    sendNotification("error", error) // To give error feedback
  }
}

updateData = async data => {
    try {
      this.setState({data: data})
      await this.props.actions.setItem("todoList", data)
    } catch (error) {
      sendNotification("error", error)
    }
 }

deleteNote = id => {
    console.log(id) || this.setState(({todoList}) =>  ({todoList: todoList.filter((_e, index) => index !== id)}))
    this.updateData(this.state.todoList)
}

editNote = editId =>  {
this.setState({isEditing: true, editId, editText: this.state.todoList[editId].data})
}
  render() {
    const saveEdit = () => {
        const {editId, editText} = this.state
        const todoList = this.state.todoList.slice()
        todoList[editId].data = editText
        this.setState({isEditing: false, todoList})
        this.updateData(this.state.todoList)
    }

    const showTodo = this.state.todoList.map(({data, title}, index)  => {
        return (
            <View key={index}> 
                <Note key={index} id={index} data={data} title={title} 
                deleteMethod={this.deleteNote} 
                editNote = {() => this.editNote(index)} />
            </View>
        )
    })

    const addNote = () => {
       if (this.state.text){
            this.state.todoList.push({title: this.state.inputTitle, 'data': this.state.text})
            this.setState ({todoList: this.state.todoList, text: ''})
            this.updateData(this.state.todoList)
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

export default withStore(TodoScreen)

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
