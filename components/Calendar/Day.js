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


const initialEvent = {
  id: "",
  start: null,
  end: null,
  title: ""
}

export class BigDay extends Component {

  state = {
    dateType: "start",
    isDateTimePickerVisible: false,
    ...initialEvent
  };

  showDateTimePicker = dateType => this.setState({ isDateTimePickerVisible: true, dateType });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({[this.state.dateType]: date})
    this.hideDateTimePicker();
  };

  handleTitleChange = title => this.setState({title})

  handleSave = () => {
    const {start, end, title, id} = this.state

    const isNewEvent = id === ""
    let newEvent = {title, start, end}
    if (isNewEvent) {
      newEvent = {
        ...newEvent,
        id: ID()
      }
    } else {
      newEvent = {...newEvent, id}
    }
    
    const invalid = validateEvent(newEvent)
    if (!invalid) {
      if (isNewEvent) {
        this.props.createEvent(newEvent)
      } else {
        this.props.changeEvent(newEvent)
      }
      this.setState({...initialEvent})
      sendNotification("success", "Event is created")
    } else {
      sendNotification("error", invalid)
    }
  }

  handleDelete = id => this.props.deleteEvent(id)

  setEditedEvent = eventId => {
    const {start, end, title} = this.props.events.find(({id}) => id === eventId)
    this.setState({id: eventId, start, end, title})
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
              <Text>Start date {start ? moment(start).format("YYYY. MMMM DD"): "not set"}</Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={()=> this.showDateTimePicker("end")}>
              <Text>End date {end ? moment(end).format("YYYY. MMMM DD") : "not set"}</Text>
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
                <Button onPress={() => this.handleDelete(id)} title="Delete event"/>
              </Col>
              <Col>
                <Button onPress={() => this.setEditedEvent(id)} title="Edit event"/>
              </Col>
            </Grid>) :
            <Text>No events for today</Text>
          }
        </View>
        <DateTimePicker
          date={dateType === "start" ? moment(start).toDate() || new Date() : moment(end).toDate() || new Date()}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    )
  }
}
