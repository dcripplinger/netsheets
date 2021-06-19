import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
`;

const AmountInput = ({ value, onChange, disabled }) => {
  const [displayValue, setDisplayValue] = useState(
    value ? `${value.toFixed(2)}` : ""
  );

  const _onChange = (e) => {
    if (/^-?[0-9]*\.?[0-9]{0,2}$/.test(e.target.value)) {
      setDisplayValue(e.target.value);
      const parsed = Number(e.target.value);
      onChange(parsed || null);
    }
  };

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={_onChange}
      disabled={disabled}
    />
  );
};

AmountInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

AmountInput.defaultProps = {
  onChange: () => {},
  disabled: false,
};

export default AmountInput;
