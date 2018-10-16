import React from "react";
import MotivationScreen from "../screens/MotivationScreen";
import renderer from "react-test-renderer";

jest.mock("react-native-gesture-handler", () => {});

describe("Testing MotivationScreen", () => {
  const tree = renderer.create(<MotivationScreen />);

  test("renders correctly", () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe("Initial state", () => {
    test("modal should be hidden", () => {
      expect(tree.toTree().rendered.instance.state.modalVisible).toBe(false);
    });

    test("edit view should be closed", () => {
      expect(tree.toTree().rendered.instance.state.editGoal).toBe(false);
    });

    test("input should be empty", () => {
      expect(tree.toTree().rendered.instance.state.modalInput).toEqual("");
    });

    test("no goal should be selected for edit", () => {
      expect(tree.toTree().rendered.instance.state.editId).toEqual(-1);
    });
  });

  describe("Modal functions", () => {
    describe("Reset selected modal", () => {
      test("clear input successfully", () => {
        tree.toTree().rendered.instance.resetModalState();
        expect(tree.toTree().rendered.instance.state.modalInput).toEqual("");
      });

      test("edit mode exited", () => {
        tree.toTree().rendered.instance.resetModalState();
        expect(tree.toTree().rendered.instance.state.editGoal).toBe(false);
      });

      test("deselect goal", () => {
        tree.toTree().rendered.instance.resetModalState();
        expect(tree.toTree().rendered.instance.state.editId).toEqual(-1);
      });
    });

    test("modal opens successfully", () => {
      tree.toTree().rendered.instance.onPressNewGoal();
      expect(tree.toTree().rendered.instance.state.modalVisible).toBe(true);
    });

    test("modal closes successfully", () => {
      tree.toTree().rendered.instance.setModalInvisible();
      expect(tree.toTree().rendered.instance.state.modalVisible).toBe(false);
    });
  });

  describe("Handle goals", () => {
    test("create goal successfully", () => {
      tree.toTree().rendered.instance.handleInputChange("Walk");
      tree.toTree().rendered.instance.closeAndCreate();
      expect(tree.toTree().rendered.instance.state.data).toEqual(["Walk"]);
    });

    describe("Select a goal", () => {
      test("enter edit mode", () => {
        tree.toTree().rendered.instance.onRowPress(0);
        expect(tree.toTree().rendered.instance.state.editGoal).toBe(true);
      });

      test("select correct goal", () => {
        expect(tree.toTree().rendered.instance.state.editId).toEqual(0);
      });

      test("input should be current goal", () => {
        expect(tree.toTree().rendered.instance.state.modalInput).toEqual(
          "Walk"
        );
      });
    });

    test("cancel modal succesfully", () => {
      tree.toTree().rendered.instance.cancelModal();
      expect(tree.toTree().rendered.instance.state.modalVisible).toBe(false);
    });

    test("delete goal successfully", () => {
      tree.toTree().rendered.instance.deleteElement();
      expect(tree.toTree().rendered.instance.state.data).toHaveLength(0);
    });
  });
});
