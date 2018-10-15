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
});
