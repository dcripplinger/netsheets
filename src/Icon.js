import { SvgIcon } from "@material-ui/core";
import PropTypes from "prop-types";
import styled from "styled-components";

const NothingIcon = (props) => {
  return <SvgIcon {...props} />;
};

const MaterialContainer = styled.span`
  user-select: none;
  font-size: inherit;
`;

const MaterialIconRounded = ({ name }) => {
  return (
    <MaterialContainer className="material-icons-round">
      {name}
    </MaterialContainer>
  );
};

const names = {
  nothing: NothingIcon,
};

const Container = styled.div`
  display: inline-flex;
  font-size: ${(p) => p.fontSize};
  color: ${(p) => p.color};
  margin: ${(p) => p.margin};
`;

const Icon = ({ name, fontSize, color, margin }) => {
  const Component = names[name] || MaterialIconRounded;

  return (
    <Container fontSize={fontSize} color={color} margin={margin}>
      <Component
        name={name}
        fontSize={fontSize}
        color={color}
        margin={margin}
      />
    </Container>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
};

Icon.defaultProps = {
  fontSize: "24px",
};

export default Icon;
