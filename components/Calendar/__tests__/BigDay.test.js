import React from "react";
import BigDay from "../BigDay";
import renderer from "react-test-renderer";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

describe("BigDay snapshot.", () => {
  const initialEvent = {
    id: "",
    start: moment().toDate(),
    end: moment()
      .add(1, "hour")
      .toDate(),
    title: ""
  };

  const testEvent = {
    id: "0000",
    start: moment()
      .add(1, "week")
      .toDate(),
    end: moment()
      .add(2, "week")
      .toDate(),
    title: "Test event"
  };

  let tree;
  beforeAll(() => {
    tree = renderer.create(
      <BigDay events={[testEvent]} deleteEvent={jest.fn()} />
    );
  });
  test("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("events are received through props", () => {
    expect(tree.toTree().props.events.length).toBe(1);
  });

  describe("DateTimePicker visibility", () => {
    test("DateTimePicker gets visible", () => {
      tree.toTree().instance.showDateTimePicker("start");
      expect(tree.toTree().instance.state.isDateTimePickerVisible).toBe(true);
    });

    test("DateTimePicker gets hidden", () => {
      tree.toTree().instance.hideDateTimePicker();
      expect(tree.toTree().instance.state.isDateTimePickerVisible).toBe(false);
    });

    test("end DatePicker gets visible when picking 'end'", () => {
      tree.toTree().instance.showDateTimePicker("end");
      expect(tree.toTree().instance.state.dateType).toBe("end");
      expect(tree.toTree().instance.state.isDateTimePickerVisible).toBe(true);
    });
  });

  describe("Event handling", () => {
    beforeAll(() => {
      tree.toTree().instance.setEditedEvent(testEvent.id);
    });
    describe("Set event that is edited", () => {
      test("id is set", () => {
        expect(tree.toTree().instance.state.id).toBe(testEvent.id);
      });
      test("title is set", () => {
        expect(tree.toTree().instance.state.id).toBe(testEvent.id);
      });
      test("start date is set", () => {
        moment(tree.toTree().instance.state.start).isSame(
          moment(testEvent.start),
          "day"
        );
      });
      test("end date is set", () => {
        moment(tree.toTree().instance.state.end).isSame(
          moment(testEvent.end),
          "day"
        );
      });
    });
    describe("Change event", () => {
      test("changing title", () => {
        tree.toTree().instance.handleTitleChange(testEvent.title);
        expect(tree.toTree().instance.state.title).toBe(testEvent.title);
      });

      test("changing start date", () => {
        tree.toTree().instance.showDateTimePicker("start");
        tree.toTree().instance.handleDatePicked(testEvent.start);
        tree.toTree().instance.hideDateTimePicker();
        expect(tree.toTree().instance.state.start).toBe(testEvent.start);
      });

      test("changing end date", () => {
        tree.toTree().instance.showDateTimePicker("end");
        tree.toTree().instance.handleDatePicked(testEvent.end);
        tree.toTree().instance.hideDateTimePicker();
        expect(tree.toTree().instance.state.end).toBe(testEvent.end);
      });
    });

    describe("Reset event", () => {
      test("id is reset", () => {
        tree.toTree().instance.state.id = testEvent.id;
        tree.toTree().instance.reset();
        expect(tree.toTree().instance.state.id).toBe(initialEvent.id);
      });
      test("title is reset", () => {
        tree.toTree().instance.state.title = testEvent.title;
        tree.toTree().instance.reset();
        expect(tree.toTree().instance.state.title).toBe(initialEvent.title);
      });
      test("start date is reset", () => {
        tree.toTree().instance.state.start = testEvent.start;
        tree.toTree().instance.reset();
        expect(
          moment(tree.toTree().instance.state.start).isSame(
            moment(initialEvent.start),
            "day"
          )
        ).toBe(true);
      });
      test("end date is reset", () => {
        tree.toTree().instance.state.end = testEvent.end;
        tree.toTree().instance.reset();
        expect(
          moment(tree.toTree().instance.state.end).isSame(
            moment(initialEvent.end),
            "day"
          )
        ).toBe(true);
      });
    });

    describe("Save event", () => {
      test("event is saved", () => {
        tree.toTree().instance.handleSave();
        //NOTE: Finish test
      });
    });

    describe("Delete event", () => {
      test("event gets deleted", () => {
        tree.toTree().instance.state.id = testEvent.id;
        tree.toTree().instance.handleDelete(testEvent.id);
        expect(tree.toTree().instance.state.id).toBe(initialEvent.id);
      });
    });
  });
});
