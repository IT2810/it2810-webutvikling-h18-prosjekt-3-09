import React from "react";
import TodoList from "../TodoList";
import renderer from "react-test-renderer";

describe("TodoList snapshot", () => {
  let tree;
  const testList = [
    { data: "test data", title: "test title" },
    { data: "test data 2", title: "test title 2" },
    { data: "test data 3", title: "test title 3" }
  ];
  beforeAll(() => {
    tree = renderer.create(<TodoList todoList={testList} />);
  });

  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("list renders", () => {
    expect(tree.toTree().rendered.length).toBe(testList.length);
  });
});
