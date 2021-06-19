import PropTypes from "prop-types";

const basic = [
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
  PropTypes.bool,
];

const basicValuePropType = PropTypes.oneOfType(basic);

const valuePropType = PropTypes.oneOfType([
  ...basic,
  PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: basicValuePropType,
    })
  ),
]);

export { basicValuePropType };

export default valuePropType;
