import React, { Component } from "react";

import Todo from "../components/Todo";

export default class TodoScreen extends Component {
  static navigationOptions = {
    title: "Todo"
  };
  render() {
    return <Todo />;
  }
}
