import _ from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import { basicValuePropType } from "./valuePropType";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RadioInput = ({ value, onChange, disabled, options }) => {
  return (
    <Container>
      {_.map(options, (option) => (
        <Label key={option.value}>
          <Input
            type="radio"
            disabled={disabled}
            checked={_.isEqual(option.value, value)}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </Label>
      ))}
    </Container>
  );
};

RadioInput.propTypes = {
  value: basicValuePropType,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: basicValuePropType,
    })
  ),
};

RadioInput.defaultProps = {
  onChange: () => {},
  disabled: false,
};

export default RadioInput;
