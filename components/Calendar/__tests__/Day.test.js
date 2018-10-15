import React from "react";
import renderer from "react-test-renderer";
import Day from "../Day";
import moment from "moment";
import colors from "../../../constants/Colors";

describe("Day snapshot", () => {
  let tree;
  let value = new Date();

  test("renders correctly", () => {
    tree = renderer.create(<Day />);
    expect(tree).toMatchSnapshot();
  });

  test("displays day", () => {
    tree = renderer.create(<Day value={value} />);
    expect(tree.toTree().rendered.props.title).toBe(moment(value).format("D"));
  });

  describe("Day type", () => {
    describe("Today", () => {
      describe("day is today", () => {
        beforeAll(() => {
          tree = renderer.create(<Day today={true} />);
        });
        test("today's text color", () => {
          expect(tree.toTree().rendered.props.textStyle.color).toBe(
            colors.light
          );
        });
        test("today's background color", () => {
          expect(tree.toTree().rendered.props.backgroundColor).toBe(
            colors.color5
          );
        });
      });
      describe("day is not today", () => {
        beforeAll(() => {
          tree = renderer.create(<Day />);
        });
        test("not today's text color", () => {
          expect(tree.toTree().rendered.props.textStyle.color).not.toBe(
            colors.light
          );
        });
        test("not today's background color", () => {
          expect(tree.toTree().rendered.props.backgroundColor).not.toBe(
            colors.color5
          );
        });
      });
    });
    describe("Placeholder", () => {
      describe("day is placeholder", () => {
        beforeAll(() => {
          tree = renderer.create(<Day placeholder={true} />);
        });
        test("enables placeholder", () => {
          expect(tree.toTree().rendered.props.disabled).toBe(true);
        });

        test("placeholder's text color", () => {
          expect(tree.toTree().rendered.props.textStyle.color).toBe(
            colors.dark
          );
        });
        test("placeholder's background color", () => {
          expect(tree.toTree().rendered.props.backgroundColor).toBe(
            "transparent"
          );
        });
      });

      describe("day is not placeholder", () => {
        beforeAll(() => {
          tree = renderer.create(<Day placeholder={false} />);
        });
        test("disables placeholder", () => {
          expect(tree.toTree().rendered.props.disabled).toBe(false);
        });
        test("not placeholder's text color", () => {
          expect(tree.toTree().rendered.props.textStyle.color).toBe(
            colors.dark
          );
        });
        test("not placeholder's background color", () => {
          expect(tree.toTree().rendered.props.backgroundColor).toBe(
            "transparent"
          );
        });
      });
    });

    describe("Event", () => {
      describe("day has event", () => {
        beforeAll(() => {
          tree = renderer.create(<Day hasEvent={true} />);
        });
        test("day with event's text color", () => {
          expect(tree.toTree().rendered.props.textStyle.color).toBe(
            colors.light
          );
        });
        test("day with event's background color", () => {
          expect(tree.toTree().rendered.props.backgroundColor).toBe(
            colors.color3
          );
        });
      });

      describe("day has no event", () => {
        beforeAll(() => {
          tree = renderer.create(<Day hasEvent={false} />);
        });
        test("day without event's text color", () => {
          expect(tree.toTree().rendered.props.textStyle.color).not.toBe(
            colors.light
          );
        });
        test("day without event's background color", () => {
          expect(tree.toTree().rendered.props.backgroundColor).not.toBe(
            colors.color3
          );
        });
      });
    });

    // NOTE: Does not actually test anything...?
    describe("Event handling", () => {
      beforeAll(() => {
        tree = renderer.create(<Day onDayChange={jest.fn()} />);
      });

      test("day clicked", () => {
        expect(tree.toTree().rendered.props.onPress()).toBe(undefined);
      });
    });
  });
});
