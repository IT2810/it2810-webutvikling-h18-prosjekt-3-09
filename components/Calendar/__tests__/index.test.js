import React from "react";
import Calendar from "../";
import renderer from "react-test-renderer";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

describe("Calendar snapshot.", () => {
  let tree;
  beforeAll(() => {
    tree = renderer.create(<Calendar />);
  });

  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("starts without editing a day", () => {
    const { state } = tree.toTree().rendered.instance;
    expect(state.editedDay).toBe(null);
  });

  test("starts with current month", () => {
    const { state } = tree.toTree().rendered.instance;
    expect(state.currentMonth.month()).toBe(moment().month());
  });

  test("placeholders fill the month to be 42 days", () => {
    const { state } = tree.toTree().rendered.instance;
    expect(Array.from(state.weeks.by("day")).length).toBe(42);
  });
});
