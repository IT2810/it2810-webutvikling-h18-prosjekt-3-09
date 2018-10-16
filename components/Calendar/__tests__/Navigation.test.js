import React from "react";
import renderer from "react-test-renderer";
import Navigation from "../Navigation";

describe("Navigation snapshot", () => {
  let tree;

  beforeAll(() => {
    tree = renderer.create(<Navigation onNavigation={jest.fn()} />);
  });
  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("previous month pressed", () => {
    tree.toTree().rendered.props.children[0].props.onPress();
    expect(tree.toTree().props.onNavigation).toBeCalledWith(-1);
  });
  test("day pressed", () => {
    tree.toTree().rendered.props.children[1].props.onPress();
    expect(tree.toTree().props.onNavigation).toBeCalledWith(0);
  });
  test("next month pressed", () => {
    tree.toTree().rendered.props.children[2].props.onPress();
    expect(tree.toTree().props.onNavigation).toBeCalledWith(1);
  });
});
