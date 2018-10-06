import React from 'react';
import { 
    Text,
    View,
    ListView,
    Modal,
    Button,
    TouchableHighlight,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const tempData = ['Mål 1', 'Mål 2', 'Mål 3', 'Mål 4', 'Mål 5', 'Mål 6', 'Mål 7', 'Mål 8', 'Mål 9', 'Mål 10'];  // Load with asyncstorage

export default class MotivationScreen extends React.Component {
  static navigationOptions = {
    title: 'Motivation Manager',
};
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(tempData),  
      modalVisible: false,   
      modalInput: '',
      editGoal: false,
      editId: -1,
    };

    
  }

  deleteElement = () => {
      tempData.splice(this.state.editId, 1);
      this.setState({
        modalInput: '',
        editGoal: false,
        editId: -1,
        dataSource: this.ds.cloneWithRows(tempData)
    });
      this.setModalInvisible();
  }

  onPressNewGoal = () => {
    this.setState({
        modalVisible: true
    });
  }

  cancelModal = () => {
    this.setState({
        modalInput: '',
        editGoal: false,
        editId: -1,
        dataSource: this.ds.cloneWithRows(tempData)
    });
    this.setModalInvisible();
  }

  setModalInvisible = () => {
    this.setState({modalVisible: false});
  }

    closeAndCreate = () => {
        if(this.state.editGoal) {
            tempData[this.state.editId] = this.state.modalInput;
        }
        else {
            tempData.push(this.state.modalInput);  // unshift()  prepend, but listview is bugged
        }
        
        
        this.setState({
            modalInput: '',
            editGoal: false,
            editId: -1,
            dataSource: this.ds.cloneWithRows(tempData)
        });
        this.setModalInvisible();
    }

    onRowPress = (rowID) => {
        this.setState({
            editGoal: true,
            editId: rowID,
            modalInput: tempData[rowID],
            modalVisible: true,
        });        
    }

    renderListRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight
            onPress = {() => this.onRowPress(rowID)}
            underlayColor="#33aaddaa"
            >
                <Text>{rowData}</Text>
            </TouchableHighlight>
        );
    }


  render() {
    return (
    <View>
        <View style>

            <TouchableHighlight
                onPress={this.onPressNewGoal}

            >
            <Text>Legg til nytt mål</Text>
            </TouchableHighlight>
        
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderListRow}
            />
        </View>
        <Modal
            transparent={true}
            animationType = 'slide' // fade or none
            visible = {this.state.modalVisible}
            onRequestClose={() => {
                console.log("Request to close modal");
            }}>
            <View>
                <Text>Nytt mål</Text>
                <TextInput
                    placeholder = 'Målbeskrivelse'
                    onChangeText={(modalInput) => this.setState({modalInput})}
                    value={this.state.modalInput}/>
                
                <View>
                    <TouchableHighlight
                        onPress={this.closeAndCreate}
                        underlayColor="#00000022">
                        <Text>Opprett</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.cancelModal}
                        underlayColor="#aaaaaaaa">
                        <Text>Avbryt</Text>
                    </TouchableHighlight>
                {this.state.editGoal && <Button
                onPress={this.deleteElement}
                title="Slett"
                />}
                </View>

            </View>
        </Modal>


    </View>
    );
  }
}

