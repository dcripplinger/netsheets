import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

import Icon from "../../Icon";
import colors from "../../styles/colors";
import DateInput from "./DateInput";
import AmountInput from "./AmountInput";
import ItemizedListInput from "./ItemizedListInput";
import RadioInput from "./RadioInput";
import StringInput from "./StringInput";
import valuePropType, { basicValuePropType } from "./valuePropType";

const Container = styled.div`
  margin: ${(p) => p.margin};
`;

const LabelLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const HelpLine = styled.div`
  font-style: italic;
  margin-bottom: 8px;
`;

const Button = styled.button`
  margin-left: 16px;
`;

// All components in this object must have the props value, onChange, and disabled.
const typeToComponent = {
  string: StringInput,
  amount: AmountInput,
  date: DateInput,
  radio: RadioInput,
  itemizedList: ItemizedListInput,
};

const FormInput = ({
  type: _type,
  value,
  label,
  help,
  onChange,
  disabled,
  options,
  margin,
}) => {
  const Input = typeToComponent[_type];

  const [displayHelp, setDisplayHelp] = useState(false);
  const toggleHelp = () => {
    setDisplayHelp((prev) => !prev);
  };

  return (
    <Container margin={margin}>
      <LabelLine>
        <div>{label}</div>
        {help && (
          <Button onClick={toggleHelp}>
            <Icon name="help" color={colors.lightBlue} fontSize="18px" />
          </Button>
        )}
      </LabelLine>
      {displayHelp && <HelpLine>{help}</HelpLine>}
      <Input
        value={value}
        onChange={onChange}
        disabled={disabled}
        options={options}
      />
    </Container>
  );
};

FormInput.propTypes = {
  type: PropTypes.oneOf(["string", "amount", "date", "radio", "itemizedList"])
    .isRequired,
  value: valuePropType,
  label: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  /** Only makes sense for types like radio and select where the value is chosen from an enum. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: basicValuePropType,
    })
  ),
  margin: PropTypes.string,
};

FormInput.defaultProps = {
  label: "",
  margin: "0",
};

export default FormInput;
