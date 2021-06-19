import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
`;

const StringInput = ({ value, onChange, disabled }) => {
  const _onChange = (e) =>
    onChange(e.target.value === "" ? null : e.target.value);

  return (
    <Input
      type="text"
      value={value || ""}
      onChange={_onChange}
      disabled={disabled}
    />
  );
};

StringInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

StringInput.defaultProps = {
  onChange: () => {},
  disabled: false,
};

export default StringInput;
