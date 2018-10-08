import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Calendar from "../components/Calendar"


export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    return <Calendar/>
  }
}