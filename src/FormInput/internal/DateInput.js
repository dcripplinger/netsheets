import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: inherit;
  }

  .react-datepicker__input-container input {
    width: inherit;
  }
`;

const DateInput = ({ value, onChange, disabled }) => {
  return (
    <Container>
      <DatePicker selected={value} onChange={onChange} disabled={disabled} />
    </Container>
  );
};

DateInput.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

DateInput.defaultProps = {
  onChange: () => {},
  disabled: false,
};

export default DateInput;
