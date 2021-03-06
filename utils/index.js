import moment from "moment";

/*
 * Generate unique IDs for use as pseudo-private/protected names.
 * Similar in concept to
 * <http://wiki.ecmascript.org/doku.php?id=strawman:names>.
 *
 * The goals of this function are twofold:
 *
 * * Provide a way to generate a string guaranteed to be unique when compared
 *   to other strings generated by this function.
 * * Make the string complex enough that it is highly unlikely to be
 *   accidentally duplicated by hand (this is key if you're using `ID`
 *   as a private/protected name on an object).
 *
 * Use:
 *
 *     var privateName = ID();
 *     var o = { 'public': 'foo' };
 *     o[privateName] = 'bar';
 * Math.random should be unique because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters
 * after the decimal.
 */
export const ID = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);

export const validateEvent = ({ id, title, start, end, ...rest }) =>
  typeof id !== "string"
    ? "Invalid id"
    : typeof title !== "string" || title === ""
      ? "Invalid title"
      : !moment(start).isValid()
        ? "Invalid start date"
        : !moment(end).isValid()
          ? "Invalid end date"
          : !moment(end).isAfter(moment(start))
            ? "End date must follow the start date"
            : Object.keys(rest).length
              ? "Invalid fields"
              : false;
