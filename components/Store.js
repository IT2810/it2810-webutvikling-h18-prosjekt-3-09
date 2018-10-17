import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";
import { sendNotification } from "./Notification";

/**
 * This function when called, removes everything from AsyncStorage to avoid
 * problems in DEVELOPMENT mode.
 * @see https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09/issues/16
 * const purgeAsyncStorage = async () => {
 *   try {
 *     await AsyncStorage.clear();
 *   } catch (error) {
 *     sendNotification("error", error);
 *   }
 * };
 */

const Store = createContext();
/**
 * Makes the Store values available
 * @param {Component} WrappedComponent The component to pass the store values to
 * @returns {Component} Component with the Store values
 */
export const withStore = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <Store.Consumer>
          {values => (
            <WrappedComponent
              {...{
                ...values,
                ...this.props
              }}
            />
          )}
        </Store.Consumer>
      );
    }
  };

/**
 * The Database Component.
 * It uses React Context API,
 * a global state can be added,
 * much like Redux should work.
 * Right now it only contians a
 * getter and setter for AsyncStorage
 */
export default class Database extends Component {
  /**
   * Read from the Database
   * @param {String} key key of the element to retrieved
   * @returns {any} the retrieved item
   */
  readFromAsyncStorage = async key => {
    try {
      const value = await AsyncStorage.getItem(`@PersonalManagerStore:${key}`);
      // console.log("Data was retrieved from AsyncStorage", value);
      return JSON.parse(value);
    } catch (error) {
      // Error retrieving data
      sendNotification("error", error);
    }
  };

  /**
   * Write to the Database
   * @param {String} key key of the element to be overwritten
   * @param {any} value the value to add to the Database
   */
  writeToAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        `@PersonalManagerStore:${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      // Error saving data
      sendNotification("error", error);
    }
  };

  render() {
    return (
      <Store.Provider
        value={{
          actions: {
            getItem: this.readFromAsyncStorage,
            setItem: this.writeToAsyncStorage
          },
          state: this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    );
  }
}
