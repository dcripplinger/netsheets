import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

import Icon from "../../Icon";
import colors from "../../styles/colors";
import StringInput from "./StringInput";

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
};

const FormInput = ({ type: _type, value, label, help, onChange, disabled }) => {
  const Input = typeToComponent[_type];

  const [displayHelp, setDisplayHelp] = useState(false);
  const toggleHelp = () => {
    setDisplayHelp((prev) => !prev);
  };

  return (
    <div>
      <LabelLine>
        <div>{label}</div>
        {help && (
          <Button onClick={toggleHelp}>
            <Icon name="help" color={colors.lightBlue} />
          </Button>
        )}
      </LabelLine>
      {displayHelp && <HelpLine>{help}</HelpLine>}
      <Input value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.oneOf(["string"]).isRequired,
  value: PropTypes.oneOf([PropTypes.string]),
  label: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

FormInput.defaultProps = {
  label: "",
};

export default FormInput;
