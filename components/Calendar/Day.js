import React, {Component} from 'react'
import moment from "moment"

import { View, Button, TouchableOpacity, Text, TextInput } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Col, Grid, Row } from "react-native-easy-grid";
import {sendNotification} from "../Notification"


const Day = ({value, placeholder, onDayChange, today}) =>
  <View style={{
    width: 54,
    height: 54,
    opacity: placeholder ? 0.2 : 1,
    backgroundColor: today ? "red": "transparent",
    borderRadius: 27
    }}
  >
    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => onDayChange(value)}>
      <Text>{value && moment(value).format("D")}</Text>
    </TouchableOpacity>
  </View>

export default Day


export class BigDay extends Component {

  state = {
    start: null,
    end: null,
    dateType: "start",
    title: "",
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = dateType => this.setState({ isDateTimePickerVisible: true, dateType });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    this.setState({[this.state.dateType]: date})
    this.hideDateTimePicker();
  };

  handleTitleChange = title => this.setState({title})

  handleSave = () => {
    console.log("validate and save");
    const valid = false // TODO: Add validate function
    if (valid) {
      sendNotification("success", "Event is created")
    } else {
      sendNotification("error", "Invalid event. Please check")
    }
    this.props.handleClose()
    
  }


  
  render() {
    const {start, end, dateType, title} = this.state
    const {value, events} = this.props
    return (
      <View style={{flex: 1}}>
        <Grid>
          <Col>
            <Button onPress={this.props.handleClose} title="Discard"/>
          </Col>
          <Col>
            <Button onPress={this.handleSave} title="Save"/>
          </Col>
        </Grid>
        <Grid>
          <Col><Text>Title</Text></Col>
          <Col size={4}>
            <TextInput value={title} onChangeText={this.handleTitleChange}></TextInput>
          </Col>
        </Grid>
        <Grid>
          <Col>
            <TouchableOpacity onPress={()=> this.showDateTimePicker("start")}>
              <Text>Start date {moment(start || value).format("YYYY. MMMM DD")}</Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={()=> this.showDateTimePicker("end")}>
              <Text>End date {end ? moment(end).format("YYYY. MMMM DD") : ""}</Text>
            </TouchableOpacity>
          </Col>
        </Grid>
        <View>
          <Text>Events on this day:</Text>
          {events.length ? events.map(({title}) => <Text key={title}>{title}</Text>) : <Text>No events for today</Text>}
        </View>
        <DateTimePicker
          date={dateType === "start" ? (start || value.toDate()) : (end || new Date())}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    )
  }
}
