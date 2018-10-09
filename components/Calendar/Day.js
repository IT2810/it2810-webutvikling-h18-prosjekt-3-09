import React, { Component } from "react";
import moment from "moment";

import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Col, Grid } from "react-native-easy-grid";
import { sendNotification } from "../Notification";
import { ID, validateEvent } from "../../utils";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import {
  Button,
  Card,
  List,
  ListItem,
  FormLabel,
  FormInput,
  Header
} from "react-native-elements";

const Day = ({ value, placeholder, onDayChange, today, hasEvent }) => (
  <Button
    disabled={placeholder}
    containerViewStyle={{
      height: layout.window.width / 7,
      width: layout.window.width / 7,
      opacity: placeholder ? 0.2 : 1,
      marginLeft: 0,
      marginRight: 0,
      flex: 1
    }}
    buttonStyle={{
      flex: 1
    }}
    textStyle={{
      color:
        !hasEvent || placeholder
          ? today
            ? colors.light
            : colors.dark
          : colors.light
    }}
    backgroundColor={
      today ? colors.color5 : hasEvent ? colors.color3 : "transparent"
    }
    onPress={() => onDayChange(value)}
    title={moment(value).format("D")}
  />
);

export default Day;

const initialEvent = {
  id: "",
  start: moment().toDate(),
  end: moment()
    .add(1, "hour")
    .toDate(),
  title: ""
};

export class BigDay extends Component {
  state = {
    dateType: "start",
    isDateTimePickerVisible: false,
    ...initialEvent
  };

  showDateTimePicker = dateType =>
    this.setState({ isDateTimePickerVisible: true, dateType });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({ [this.state.dateType]: date });
    this.hideDateTimePicker();
  };

  handleTitleChange = title => this.setState({ title });

  reset = () => this.setState({ ...initialEvent });

  handleSave = () => {
    const { start, end, title, id } = this.state;

    const isNewEvent = id === "";
    let newEvent = { title, start, end };
    if (isNewEvent) {
      newEvent = {
        ...newEvent,
        id: ID()
      };
    } else {
      newEvent = { ...newEvent, id };
    }

    const invalid = validateEvent(newEvent);
    if (!invalid) {
      if (isNewEvent) {
        this.props.createEvent(newEvent);
      } else {
        this.props.changeEvent(newEvent);
      }
      this.reset();
      sendNotification("success", "Event is created");
    } else {
      sendNotification("error", invalid);
    }
  };

  handleDelete = id => {
    this.props.deleteEvent(id);
    this.reset();
  };

  setEditedEvent = eventId => {
    const { start, end, title } = this.props.events.find(
      ({ id }) => id === eventId
    );
    this.setState({ id: eventId, start, end, title });
  };

  render() {
    const { start, end, dateType, title, id } = this.state;
    const { value, events } = this.props;

    const isNew = id === "";

    return (
      <ScrollView>
        <Header
          backgroundColor={colors.color1}
          centerComponent={{
            text: moment(value).format("MMM DD."),
            style: { color: colors.light }
          }}
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.changeDay(-1)
          }}
          rightComponent={{
            icon: "arrow-forward",
            color: "#fff",
            onPress: () => this.props.changeDay(1)
          }}
        />
        <Grid style={{ marginTop: 16 }}>
          <Col>
            <Button
              backgroundColor={colors.color1}
              onPress={this.handleSave}
              title={isNew ? "Create" : "Save"}
            />
          </Col>
          <Col>
            <Button
              backgroundColor={colors.color4}
              onPress={() =>
                isNew ? this.props.handleClose() : this.handleDelete(id)
              }
              title={isNew ? "Close" : "Delete"}
            />
          </Col>
        </Grid>
        <Card title={`${isNew ? "Create" : "Edit"} event`}>
          <View style={{ flexDirection: "row" }}>
            <FormLabel>Title</FormLabel>
            <FormInput
              placeholder="Enter title"
              onChangeText={this.handleTitleChange}
              value={title}
            />
          </View>
          <Grid>
            <Col>
              <TouchableOpacity
                onPress={() => this.showDateTimePicker("start")}
              >
                <Text>
                  Start date{" "}
                  {start ? moment(start).format("YYYY. MMMM DD") : "not set"}
                </Text>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={() => this.showDateTimePicker("end")}>
                <Text>
                  End date{" "}
                  {end ? moment(end).format("YYYY. MMMM DD") : "not set"}
                </Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </Card>
        <Card title="Events on this day:">
          {events.length ? (
            <List>
              {events.map(({ id, title, start, end }) => (
                <ListItem
                  title={title}
                  key={title}
                  subtitle={`${moment(start).format("YYYY-MM-DD")} • ${moment(
                    end
                  ).format("YYYY-MM-DD")}`}
                  onPress={() => this.setEditedEvent(id)}
                />
              ))}
            </List>
          ) : (
            <Text>No events for today</Text>
          )}
        </Card>
        <DateTimePicker
          date={
            dateType === "start"
              ? moment(start).toDate() || new Date()
              : moment(end).toDate() || new Date()
          }
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </ScrollView>
    );
  }
}
