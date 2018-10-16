import React from "react";
import renderer from "react-test-renderer";
import Store from "../Store";
/*
 * import MockStorage from "./__mocks__/AsyncStorage";
 * import * as notification from "../Notification";
 */

const testObject = { test: "test" };
/*
 * const storageCache = { "@PersonalManagerStore:test": testObject };
 * const AsyncStorage = new MockStorage(storageCache);
 * jest.setMock("AsyncStorage", AsyncStorage);
 */

describe("Store snapshot", () => {
  let tree;

  beforeAll(() => {
    tree = renderer.create(<Store />);
  });

  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  // NOTE: Mocking AsyncStorage does not seem to work... Therefore none of the following tests do

  /*
   * test("Data is written to AsyncStorage", () => {
   *   expect.assertions(1);
   *   return tree
   *     .toTree()
   *     .instance.writeToAsyncStorage("test", testObject)
   *     .then(() =>
   *       AsyncStorage.getItem("@PersonalManagerStore:test").then(data =>
   *         expect(JSON.parse(data)).toEqual(testObject)
   *       )
   *     );
   * });
   */

  /*
   * test("Data is read from AsyncStorage", () => {
   *   expect.assertions(1);
   *   return AsyncStorage.setItem("", JSON.stringify(testObject)).then(() =>
   *     tree
   *       .toTree()
   *       .instance.readFromAsyncStorage("test")
   *       .then(data => expect(data).toEqual(testObject))
   *   );
   * });
   */

  /*
   * describe("Error", () => {
   *   notification.sendNotification = jest.fn();
   *   test("wrong data is sent to AsyncStorage", async () => {
   *     expect.assertions(1);
   *     try {
   *       await tree.toTree().instance.writeToAsyncStorage("test", testObject);
   *     } catch (error) {
   *       expect(notification.sendNotification).toBeCalled("error", error);
   *     }
   *   });
   */

  /*
   *   test("data retrieval failed from AsyncStorage", async () => {
   *     expect.assertions(1);
   *     try {
   *       await tree.toTree().instance.readFromAsyncStorage("test");
   *     } catch (error) {
   *       expect(notification.sendNotification).toBeCalled("error", error);
   *     }
   *   });
   * });
   */
});
