import React from "react";
import renderer from "react-test-renderer";
import DateInput from "../DateInput";
import moment from "moment";
import { FormLabel, Text } from "react-native-elements";

describe("DateInput snapshot", () => {
  let tree;
  const value = new Date();
  const label = "Test";
  beforeAll(() => {
    tree = renderer.create(
      <DateInput onPress={jest.fn()} label={label} value={value} />
    );
  });

  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("display label", () => {
    expect(
      tree.toTree().rendered.props.children.find(e => e.type === FormLabel)
        .props.children
    ).toBe(label);
  });

  test("display date", () => {
    expect(
      tree.toTree().rendered.props.children.find(e => e.type === Text).props
        .children
    ).toBe(moment(value).format("YYYY. MMMM DD"));
  });
});
