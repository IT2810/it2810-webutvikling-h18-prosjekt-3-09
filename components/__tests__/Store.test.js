import React from "react";
import renderer from "react-test-renderer";
import Store from "../Store";
import MockStorage from "./__mocks__/AsyncStorage";

describe("Store snapshot", () => {
  let tree;
  const testObject = { test: "test" };
  const storageCache = {};
  const AsyncStorage = new MockStorage(storageCache);
  jest.setMock("AsyncStorage", AsyncStorage);

  beforeAll(() => {
    tree = renderer.create(<Store />);
  });

  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  // NOTE: Not working correctly
  test("Data is written to AsyncStorage", () => {
    expect.assertions(1);
    return tree
      .toTree()
      .instance.writeToAsyncStorage("test", testObject)
      .then(() =>
        AsyncStorage.getItem("@PersonalManagerStore:test").then(data =>
          expect(JSON.parse(data)).toEqual(testObject)
        )
      );
  });

  // NOTE: Not working correctly
  test("Data is read from AsyncStorage", () => {
    expect.assertions(1);
    return AsyncStorage.setItem("", JSON.stringify(testObject)).then(() =>
      tree
        .toTree()
        .instance.readFromAsyncStorage("test")
        .then(data => expect(data).toEqual(testObject))
    );
  });
});
