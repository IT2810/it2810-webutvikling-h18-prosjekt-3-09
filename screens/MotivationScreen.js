import React from "react";
import {
  Text,
  View,
  ListView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput
} from "react-native";
import { withStore } from "../components/Store/";
import { sendNotification } from "../components/Notification";
import { Button } from "react-native-elements";
import { Divider } from "react-native-elements";
import Colors from "../constants/Colors";

const tempData = []; // Load with asyncstorage

class MotivationScreen extends React.Component {
  static navigationOptions = {
    title: "Motivation"
  };

  constructor() {
    super();
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      managerData: [],
      dataSource: this.ds.cloneWithRows([]), // TODO: initialize empty
      modalVisible: false,
      modalInput: "",
      editGoal: false,
      editId: -1
    };
  }

  async componentDidMount() {
    try {
      const savedData = await this.props.actions.getItem("managerData"); // datakey is either string of 'todo' or 'manager', essentially the key of the data where you store it in AsyncStorage
      this.setState({ managerData: savedData || [] }); // If no data was found in AsyncStorage, set an empty array
      tempData = savedData || [];
      // console.log("successfully mounted");
    } catch (error) {
      sendNotification("error", error); // To give error feedback
    }
  }

  // Use this function to update both the local state, and the database at the same time.
  updateData = async data => {
    try {
      this.setState({ data: data });
      await this.props.actions.setItem("managerData", data);
      this.updateListRows();
    } catch (error) {
      sendNotification("error", error);
    }
  };

  deleteElement = () => {
    tempData.splice(this.state.editId, 1);
    this.resetModalState();
    this.updateData(tempData);
    this.setModalInvisible();
  };

  onPressNewGoal = () => {
    this.setState({
      modalVisible: true
    });
  };

  resetModalState = () =>
    this.setState({ modalInput: "", editGoal: false, editId: -1 });

  cancelModal = () => {
    if (tempData != []) {
      this.resetModalState();
      this.setState({
        dataSource: this.ds.cloneWithRows(tempData)
      });
    }
    this.setModalInvisible();
  };

  updateListRows = () => {
    this.setState({
      dataSource: this.ds.cloneWithRows(tempData)
    });
  };

  setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  closeAndCreate = () => {
    if (this.state.modalInput.length != 0) {
      if (this.state.editGoal) {
        tempData[this.state.editId] = this.state.modalInput;
      } else {
        tempData.push(this.state.modalInput); // unshift()  prepend, but listview is bugged
      }

      this.updateData(tempData);
    }
    this.setState({
      modalInput: "",
      editGoal: false,
      editId: -1
    });
    this.resetModalState();
    this.setModalInvisible();
  };

  onRowPress = rowID => {
    this.setState({
      editGoal: true,
      editId: rowID,
      modalInput: tempData[rowID],
      modalVisible: true
    });
  };

  renderListRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableHighlight
        onPress={() => this.onRowPress(rowID)}
        style={styles.listElement}
        underlayColor="#33aaddaa"
      >
        <Text style={styles.listText}>{rowData}</Text>
      </TouchableHighlight>
    );
  };

  handleInputChange = modalInput => this.setState({ modalInput });

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.container}>
          <Button
            large
            onPress={this.onPressNewGoal}
            backgroundColor={Colors.color1}
            rounded={true}
            rightIcon={{ name: "cached" }}
            title="Add new goal"
            containerViewStyle={{ marginTop: 10 }}
          />
          <Divider style={styles.divider} />
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderListRow}
            style={styles.listElementContainer}
          />
        </View>
        <Modal
          transparent={true}
          animationType="slide" // fade or none
          visible={this.state.modalVisible}
          style={styles.modal}
          onRequestClose={() => {
            this.cancelModal;
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {this.state.editGoal ? "Edit goal" : "New goal"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Description"
              onChangeText={modalInput => this.handleInputChange(modalInput)}
              value={this.state.modalInput}
            />

            <View style={styles.modalButtons}>
              <Button
                rounded
                onPress={this.closeAndCreate}
                title={this.state.editGoal ? "Save" : "Create"}
                backgroundColor={Colors.confirmBackground}
              />

              <Button
                rounded
                onPress={this.cancelModal}
                title="Cancel"
                backgroundColor={Colors.cancelBackground}
              />
              {this.state.editGoal && (
                <Button
                  rounded
                  onPress={this.deleteElement}
                  backgroundColor={Colors.deleteBackground}
                  title="Delete"
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default withStore(MotivationScreen);

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20
  },
  newElementButton: {
    backgroundColor: "rgba(40,200,40, 1)",
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3 // android only
  },
  divider: {
    backgroundColor: Colors.lightgrey,
    marginVertical: 10
  },
  listElementContainer: {
    marginTop: 10,
    marginBottom: 100
  },

  listElement: {
    flex: 1,
    borderWidth: 2,
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    borderStyle: "solid",
    borderColor: "#DDDDDD",
    borderRadius: 5,
    height: 50,
    marginBottom: 5
  },
  listText: {
    fontSize: 20,
    textAlignVertical: "center",
    paddingLeft: 30
  },
  modal: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 25,
    elevation: 20 // android only
  },
  modalButtons: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100
  },
  modalInput: {
    marginHorizontal: 30,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 30,
    marginVertical: 20,
    paddingBottom: 5,
    fontSize: 20
  },
  modalTitle: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 16
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center"
  },
  modalCreateButton: {
    backgroundColor: "rgba(40,200,40, 1)",
    paddingVertical: 20,
    borderRadius: 10,
    width: 120,
    elevation: 3 // android only
  },
  modalCancelButton: {
    backgroundColor: "rgba(255,200,40, 1)",
    paddingVertical: 20,
    borderRadius: 10,
    width: 120,
    elevation: 3 // android only
  },
  modalDeleteButton: {
    backgroundColor: "rgba(200, 40,40, 1)",
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 3 // android only
  }
});
