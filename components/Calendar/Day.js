import React, {Component} from 'react'
import moment from "moment"

import { View, Button, TouchableOpacity, Text, TextInput } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Col, Grid } from "react-native-easy-grid";
import {sendNotification} from "../Notification"
import {ID, validateEvent} from "../../utils"

const Day = ({value, placeholder, onDayChange, today, hasEvent}) =>
  <View style={{
    height: 54,
    opacity: placeholder ? 0.2 : 1,
    backgroundColor: today ? "red": hasEvent ? "blue" : "transparent",
    borderRadius: hasEvent ? 0 : 27
    }}
  >
    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => onDayChange(value)}>
      <Text style={{color: hasEvent || today ? "white" : "black"}}>{value && moment(value).format("D")}</Text>
    </TouchableOpacity>
  </View>

export default Day


export class BigDay extends Component {

  state = {
    start: new Date(),
    end: null,
    dateType: "start",
    title: "",
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = dateType => this.setState({ isDateTimePickerVisible: true, dateType });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({[this.state.dateType]: date})
    this.hideDateTimePicker();
  };

  handleTitleChange = title => this.setState({title})

  handleSave = () => {
    const {start, end, title} = this.state
    const newEvent = {
      id: ID(),
      title,
      start,
      end
    }
    const invalid = validateEvent(newEvent)
    if (!invalid) {
      this.props.createEvent(newEvent)
      sendNotification("success", "Event is created")
    } else {
      sendNotification("error", invalid)
    }
  }


  
  render() {
    const {start, end, dateType, title} = this.state
    const {value, events} = this.props
    return (
      <View style={{flex: 1}}>
        <Text>{moment(value).format("MMM DD.")}</Text>
        <Grid>
          <Col>
            <Button onPress={this.handleSave} title="Save"/>
          </Col>
          <Col>
            <Button onPress={this.props.handleClose} title="Discard/Close"/>
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
              <Text>Start date {moment(start).format("YYYY. MMMM DD")}</Text>
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
          {events.length ? events.map(({id, title}) =>
            <Grid key={title}>
              <Col>
                <Text >{title}</Text>
              </Col>
              <Col>
                <Button onPress={() => console.log("editing ", id)} title="Edit event"/>
              </Col>
              <Col>
                <Button onPress={() => console.log("deleting ", id)} title="Delete event"/>
              </Col>
            </Grid>) :
            <Text>No events for today</Text>
          }
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
