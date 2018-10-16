import React from "react";
import Calendar from "../";
import renderer from "react-test-renderer";
import Moment from "moment";
import { extendMoment } from "moment-range";
import BigDay from "../BigDay";

const moment = extendMoment(Moment);

describe("Calendar snapshot", () => {
  let tree;
  const day = new Date();

  beforeAll(() => {
    tree = renderer.create(<Calendar />);
  });

  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("starts without editing a day", () => {
    expect(tree.toTree().rendered.instance.state.editedDay).toBe(null);
  });

  test("editing a day", () => {
    tree.toTree().rendered.instance.state.editedDay = day;
    // console.log(tree.toTree().rendered);
  });

  test("starts with current month", () => {
    expect(tree.toTree().rendered.instance.state.currentMonth.month()).toBe(
      moment().month()
    );
  });

  test("placeholders fill the month to be 42 days", () => {
    expect(
      Array.from(tree.toTree().rendered.instance.state.weeks.by("day")).length
    ).toBe(42);
  });

  describe("Date changes", () => {
    describe("Month", () => {
      test("next month is chosen", () => {
        tree.toTree().rendered.instance.handleMonthChange(1);
        expect(tree.toTree().rendered.instance.state.weeks.end.month()).toBe(
          moment()
            .add(2, "month")
            .month()
        );
      });
      test("previous month is chosen", () => {
        tree.toTree().rendered.instance.handleMonthChange(-1);
        expect(tree.toTree().rendered.instance.state.weeks.end.month()).toBe(
          moment()
            .add(1, "month")
            .month()
        );
      });
    });

    describe("Day", () => {
      test("edited day has changed", () => {
        const before = tree.toTree().rendered.instance.state.editedDay;
        tree.toTree().rendered.instance.handleDayChange(day);
        const after = tree.toTree().rendered.instance.state.editedDay;
        expect(before).not.toBe(after);
      });

      test("edited big day has changed", () => {
        tree.toTree().rendered.instance.state.editedDay = moment(day);
        tree.toTree().rendered.instance.handleBigDayChange(1);
        expect(
          tree
            .toTree()
            .rendered.instance.state.editedDay.diff(moment(day), "day")
        ).toBe(1);
      });
    });
  });
});
