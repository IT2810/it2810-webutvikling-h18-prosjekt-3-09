import React from "react";
import Note from "../Note";

import renderer from "react-test-renderer";
const tree = renderer.create(<Note title={"title"} />);

test("renders correctly", () => {
  expect(tree).toMatchSnapshot();
});

test("test me", () => {
  console.log(tree.toTree().instance.props);
});
