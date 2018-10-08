import React, {Component} from 'react'
import { View } from "react-native"
import Moment from "moment"
import "moment-range"
import Day, {BigDay} from './Day'
import Navigation from './Navigation'
import {withStore} from "../Store"
import {sendNotification} from "../Notification"
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

import {Card} from "react-native-elements"

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

  async componentDidMount() {
    this.getWeeks()
    try {
      const events = await this.props.actions.getItem("events")
      this.setState({events: events || []})
    } catch (error) {
      sendNotification("error", error)
    }
  }


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

  handleBigDayChange = direction => this.setState(({editedDay}) => ({editedDay: editedDay.clone().add(direction, "day")}))

  updateEvents = async events => {
    try {
      this.setState({events})
      await this.props.actions.setItem("events", events)
    } catch (error) {
      sendNotification("error", error)
    }
  }

  handleCreateEvent = newEvent =>
    this.updateEvents([...this.state.events, newEvent])

  handleDeleteEvent = eventId =>
    this.updateEvents(this.state.events.slice().filter(({id}) => id !== eventId))

  handleChangeEvent = newEvent =>
    this.updateEvents(this.state.events.slice().map(oldEvent => oldEvent.id === newEvent.id ? newEvent : oldEvent))


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
        editedDay ? 
        <BigDay
          createEvent={this.handleCreateEvent}
          deleteEvent={this.handleDeleteEvent}
          changeEvent={this.handleChangeEvent}
          handleClose={this.handleDayChange}
          changeDay={this.handleBigDayChange}
          value={editedDay}
          events={events.filter(({start, end}) => moment.range(moment(start), moment(end)).snapTo("day").contains(editedDay))}
        /> :
        <View style={{flex: 1, justifyContent: "center"}}>
         
          <Card
            containerStyle={{
              borderRadius: 6,
              marginTop: 0
            }}
            wrapperStyle={{
              padding: 0
            }}
            title={currentMonth.clone().format("YYYY MMMM")}
          >
          {month.map((week, key) =>
              <View style={{flexDirection: "row"}} key={key}>
                {week.map((day, index) => {
                  let hasEvent = 
                    events.some(({start, end}) => 
                    moment.range(moment(start), moment(end)).snapTo("day").contains(day))
                  const placeholder =
                    day.isBefore(monthStart, "month") ||
                    day.isAfter(monthEnd, "month")
                  return (
                    <Day
                      key={index}
                      today={day.isSame(moment(), "day")}
                      onDayChange={this.handleDayChange}
                      onDayHover={this.handleDayHover}
                      value={day}
                      {...{
                        hasEvent,
                        placeholder,
                      }}
                    />
                  )
                })}
            </View>
          )}
          </Card>
          <Navigation
            month={currentMonth}
            onNavigation={this.handleMonthChange}
          />
        </View>
    )
  }
}

export default withStore(Calendar)