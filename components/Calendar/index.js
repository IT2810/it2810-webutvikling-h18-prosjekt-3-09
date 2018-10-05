import React, {Component} from 'react'
import { View, Text } from "react-native"
import Moment from "moment"
import "moment-range"
import Day, {BigDay} from './Day'
import Navigation from './Navigation'
// import {sendNotification} from '../Notification'
import { Col, Row, Grid } from "react-native-easy-grid";


import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);


class Calendar extends Component {

  state = {
    weeks: null,
    currentMonth: moment(),
    start: null,
    end: null,
    shouldUpdate: false,
    events: [],
    editedDay: null
  }

  componentDidMount() {this.getWeeks()}

  componentDidUpdate = (_prevProps, {
    start: prevStart, end: prevEnd, currentMonth: prevCurrentMonth
  }) => {
    const {
      onChange, min,
      // range: {
      //   start: newStart, end: newEnd
      // }
    } = this.props


    const {
      currentMonth, start: currentStart, end: currentEnd
    } = this.state

    if (!prevCurrentMonth.isSame(currentMonth, "month")) this.getWeeks()
    if (min && !this.state.min) this.setState({min})
    if (this.state.shouldUpdate) {
      onChange(currentStart, currentEnd)
      this.setState({shouldUpdate: false})
    }

    // if (newStart && newEnd && !prevStart && !prevEnd) {
    //   this.setState({
    //     start: moment(newStart),
    //     end: moment(newEnd),
    //     currentMonth: moment(newStart)
    //   })
    // }


  }

  getWeeks = () => {
    const {currentMonth: month} = this.state
    const startOffset = month.clone().startOf("month").day()
    const endOffset = 42 - month.clone().endOf("month").date() - startOffset
    const weeks = moment.range(
      month.clone().startOf("month").add(-startOffset, "day"),
      month.clone().endOf("month").add(endOffset, "day")
    )

    
    this.setState({
      weeks,
      startOffset,
      endOffset
    })
  }

  handleMonthChange = direction => {
    this.setState(
      ({currentMonth}) => ({currentMonth: direction===0 ?
        moment() :
        currentMonth.clone().add(direction, "month")}
      )
    )
  }


  handleDayChange = day => this.setState(({editedDay}) => ({editedDay: editedDay ? null : day}))


  render() {
    const {
      currentMonth, events, editedDay
    } = this.state
    let {weeks} = this.state 

    const month = []
    weeks = weeks ? Array.from(weeks.by('day')) : []
    while(weeks.length) month.push(weeks.splice(0,7))

    const monthStart = currentMonth.clone().startOf("month")
    const monthEnd = currentMonth.clone().endOf("month")
    return (
      <View style={{flex: 1}}>
        {editedDay ? 
        <BigDay
          value={editedDay}
          handleClose={this.handleDayChange}
          events={events.filter(event => event.contains(value))}
        /> :
        <View style={{flex: 1}}>
          <Grid>
            {month.map((week, key) =>
                <Row key={key}>
                  {week.map((day, index) => {
                    let hasEvent = events.length && events.some(period => period.contains(day))
                    const placeholder =
                      day.isBefore(monthStart, "month") ||
                      day.isAfter(monthEnd, "month")
                    return (
                      <Col key={index}>
                        <Day
                          today={day.isSame(moment(), "day")}
                          onDayChange={this.handleDayChange}
                          onDayHover={this.handleDayHover}
                          value={day}
                          {...{
                            hasEvent,
                            placeholder,
                          }}
                        />
                      </Col>
                    )
                  })}
              </Row>
            )}
          </Grid>
          <Navigation
            month={currentMonth}
            onNavigation={this.handleMonthChange}
          />
        </View>
        }
      </View>
    )
  }
}

export default Calendar