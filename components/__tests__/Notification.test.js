import React from "react";
import { sendNotification } from "../Notification";

describe("sendNotification is called", () => {
  const defaultColor = "darkgrey";
  const successColor = "green";
  const warningColor = "gold";
  const errorColor = "darkred";
  const message = "test";

  test("default notification", () => {
    expect(sendNotification("", message)).toEqual({
      backgroundColor: defaultColor,
      message
    });
  });
  test("successful notification", () => {
    expect(sendNotification("success", message)).toEqual({
      backgroundColor: successColor,
      message
    });
  });
  test("warning notification", () => {
    expect(sendNotification("warning", message)).toEqual({
      backgroundColor: warningColor,
      message
    });
  });
  test("error notification", () => {
    expect(sendNotification("error", message)).toEqual({
      backgroundColor: errorColor,
      message
    });
  });
});
