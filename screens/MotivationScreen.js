import React from 'react';
import { 
    Text,
    View,
    ListView,
    StyleSheet,
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
            style={styles.listElement}
            underlayColor="#33aaddaa"
            >
                <Text style={styles.listText}>{rowData}</Text>
            </TouchableHighlight>
        );
    }


  render() {
    return (
    <View style={styles.pageContainer}>
        <View style={styles.container}>

            <TouchableHighlight
                onPress={this.onPressNewGoal}
                style = {styles.newElementButton}

            >
            <Text style={styles.buttonText}>Legg til nytt mål</Text>
            </TouchableHighlight>
        
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderListRow}
            style={styles.listElementContainer}
            />
        </View>
        <Modal
            transparent={true}
            animationType = 'slide' // fade or none
            visible = {this.state.modalVisible}
            style = {styles.modal}
            onRequestClose={() => {
                console.log("Request to close modal");
            }}>
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Nytt mål</Text>
                <TextInput
                    style={styles.modalInput}
                    placeholder = 'Målbeskrivelse'
                    onChangeText={(modalInput) => this.setState({modalInput})}
                    value={this.state.modalInput}/>
                
                <View style={styles.modalButtons}>
                    <TouchableHighlight
                        onPress={this.closeAndCreate}
                        style = {styles.modalCreateButton}
                        underlayColor="#00000022">
                        <Text style={styles.buttonText}>Opprett</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.cancelModal}
                        style = {styles.modalCancelButton}
                        underlayColor="#aaaaaaaa">
                        <Text style={styles.buttonText}>Avbryt</Text>
                    </TouchableHighlight>
                {this.state.editGoal && <Button
                onPress={this.deleteElement}
                style={styles.modalDeleteButton}
                title="Slett"
                />}
                </View>

            </View>
        </Modal>


    </View>
    );
  }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    container: {
      backgroundColor: '#fff',
      marginHorizontal: 20,
    }, 
    newElementButton: {
       backgroundColor: "rgba(40,200,40, 1)",
       paddingVertical: 20,
       marginVertical: 10,
       borderRadius: 10,
       elevation: 3,    // android only
    }, 
    listElementContainer: {
        marginBottom: 100,
    }, 

    listElement: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        borderStyle: 'solid',
        borderColor: '#DDDDDD',
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        marginBottom: 5,
        
        
    }, 
    listText: {
        fontSize: 20,
        textAlignVertical: 'center',
        paddingLeft: 30,
    }, 
    modal: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginHorizontal: 20,
        marginVertical: 25,
        elevation: 20, // android only
    },
    modalButtons: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
    },
    modalInput: {
        marginHorizontal: 30,
        borderRadius: 5,
        height: 30,
        paddingHorizontal: 5,
        marginBottom: 30,
        marginVertical: 20,
        paddingBottom: 5,
        fontSize: 20,
    },
    modalTitle: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonText: {
        fontSize: 24,
        color: "#fff",
        textAlign: 'center',
    },
    modalCreateButton: {
        backgroundColor: "rgba(40,200,40, 1)",
        paddingVertical: 20,
        borderRadius: 10,
        width: 120,
        elevation: 3,    // android only
    },
    modalCancelButton: {
        backgroundColor: "rgba(255,200,40, 1)",
        paddingVertical: 20,
        borderRadius: 10,
        width: 120,
        elevation: 3,    // android only
    },
    modalDeleteButton: {
        backgroundColor: "rgba(200, 40,40, 1)",
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 3,    // android only
    },
        
});