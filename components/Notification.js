// import Snackbar from 'react-native-snackbar';

export const sendNotification = (type, message) => {
  let backgroundColor = "darkgrey";
  switch (type) {
    case "success":
      backgroundColor = "green";
      break;
    case "warning":
      backgroundColor = "gold";
      break;
    case "error":
      backgroundColor = "darkred";
      break;

    default:
      break;
  }

  // console.log(backgroundColor, message);

  /*
   * Snackbar.show({
   *   title: message || "Message",
   *   duration: Snackbar.LENGTH_LONG,
   *   backgroundColor
   * });
   */
};
