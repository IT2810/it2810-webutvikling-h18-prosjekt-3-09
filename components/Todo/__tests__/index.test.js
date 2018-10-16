import React from "react";
import Index from "../index";

import renderer from "react-test-renderer";

jest.mock("TextInput", () => {
  const RealComponent = require.requireActual("TextInput");
  const React = require("React");
  class TextInput extends React.Component {
    render() {
      delete this.props.autoFocus;
      return React.createElement("TextInput", this.props, this.props.children);
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

describe("Testing todo", () => {
  const tree = renderer.create(<Index />);

  const initialState = {
    inputTitle: "initialTitle",
    text: "initialText"
  };

  test("renders correctly", () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
  describe("Checking initial State", () => {
    test("add new View is closed", () => {
      expect(tree.toTree().rendered.instance.state.addNew).toBe(false);
    });

    test("edit todo is closed", () => {
      expect(tree.toTree().rendered.instance.state.isEditing).toBe(false);
    });

    test("no todo should be selected for editing", () => {
      expect(tree.toTree().rendered.instance.state.editId).toBe(-1);
    });

    test("input Title is empty", () => {
      expect(tree.toTree().rendered.instance.state.inputTitle).toBe("");
    });

    test("input Text is empty", () => {
      expect(tree.toTree().rendered.instance.state.text).toBe("");
    });
  });

  describe("Handler functions", () => {
    test("change text", () => {
      tree.toTree().rendered.instance.handleTextChange("Text changed");
      expect(tree.toTree().rendered.instance.state.text).toBe("Text changed");
    });

    test("change title", () => {
      tree.toTree().rendered.instance.handleTitleChange("Title changed");
      expect(tree.toTree().rendered.instance.state.inputTitle).toBe(
        "Title changed"
      );
    });

    test("change edited text", () => {
      tree.toTree().rendered.instance.handleEditTextChange("editText changed");
      expect(tree.toTree().rendered.instance.state.editText).toBe(
        "editText changed"
      );
    });
  });

  describe("Note functions", () => {
    test("prevent empty notes from being added", () => {
      tree.toTree().rendered.instance.handleTextChange("");
      tree.toTree().rendered.instance.handleTitleChange("");
      expect(tree.toTree().rendered.instance.state.todoList).toEqual([]);
    });

    test("add new note successfully", () => {
      tree.toTree().rendered.instance.handleTextChange(initialState.text);
      tree
        .toTree()
        .rendered.instance.handleTitleChange(initialState.inputTitle);
      tree.toTree().rendered.instance.addNote(true);
      expect(tree.toTree().rendered.instance.state.todoList).toHaveLength(1);
    });

    test("edit note text", () => {
      tree.toTree().rendered.instance.editNote(0);
      tree.toTree().rendered.instance.handleEditTextChange("Edited note");
      tree.toTree().rendered.instance.saveEdit();
      expect(tree.toTree().rendered.instance.state.todoList[0].data).toBe(
        "Edited note"
      );
    });

    test("delete note successfully", () => {
      tree.toTree().rendered.instance.deleteNote(0);
      expect(tree.toTree().rendered.instance.state.todoList).toHaveLength(0);
    });
  });

  describe("Change between different Views", () => {
    test("create new todo View opens successfully", () => {
      tree.toTree().rendered.instance.createMode(true);
      expect(tree.toTree().rendered.instance.state.addNew).toBe(true);
    });

    test("create new todo View closes successfully", () => {
      tree.toTree().rendered.instance.createMode(false);
      expect(tree.toTree().rendered.instance.state.addNew).toBe(false);
    });

    test("edit todo View opens successfully", () => {
      tree.toTree().rendered.instance.handleTextChange(initialState.text);
      tree
        .toTree()
        .rendered.instance.handleTitleChange(initialState.inputTitle);
      tree.toTree().rendered.instance.addNote(true);
      tree.toTree().rendered.instance.editNote(0);
      expect(tree.toTree().rendered.instance.state.isEditing).toBe(true);
    });
    test("edit todo View closes successfully", () => {
      tree.toTree().rendered.instance.saveEdit();
      expect(tree.toTree().rendered.instance.state.isEditing).toBe(false);
    });
  });
});
