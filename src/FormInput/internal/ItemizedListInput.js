import _ from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "../../Icon";
import colors from "../../styles/colors";
import AmountInput from "./AmountInput";
import StringInput from "./StringInput";
import { basicValuePropType } from "./valuePropType";

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  margin: 0 0 8px 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Amount = styled.div`
  flex: 0 0 120px;
`;

const Description = styled.div`
  flex: 1 0 0;
  margin-left: 16px;
`;

const Button = styled.button`
  margin-left: 16px;
`;

const ItemizedListInput = ({ value: items, onChange, disabled }) => {
  const changeValue = (index, newVal) => {
    onChange((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        label: prev[index].label,
        value: newVal,
      };
      return newItems;
    });
  };

  const changeLabel = (index, newLabel) => {
    onChange((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        label: newLabel,
        value: prev[index].value,
      };
      return newItems;
    });
  };

  const removeItem = (index) => {
    onChange((prev) => {
      const newItems = [...prev];
      newItems.pop(index);
      return newItems;
    });
  };

  const addItem = () => {
    onChange((prev) => {
      const newItems = [...prev];
      newItems.push({
        label: null,
        value: null,
      });
      return newItems;
    });
  };

  return (
    <Container>
      <Row>
        <Amount>Amount</Amount>
        <Description>Description</Description>
      </Row>
      {_.map(items, (item, index) => (
        <Row key={index}>
          <Amount>
            <AmountInput
              value={item.value}
              disabled={disabled}
              onChange={(newVal) => changeValue(index, newVal)}
            />
          </Amount>
          <Description>
            <StringInput
              value={item.label}
              disabled={disabled}
              onChange={(newLabel) => changeLabel(index, newLabel)}
            />
          </Description>
          {index < items.length - 1 ? (
            <Button onClick={() => removeItem(index)}>
              <Icon name="remove" color={colors.lightBlue} />
            </Button>
          ) : (
            <Button onClick={addItem}>
              <Icon name="add" color={colors.lightBlue} />
            </Button>
          )}
        </Row>
      ))}
    </Container>
  );
};

ItemizedListInput.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: basicValuePropType,
    })
  ),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

ItemizedListInput.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default ItemizedListInput;
