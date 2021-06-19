import styled from "styled-components";

import colors from "./styles/colors";

const PrimaryButton = styled.button`
  background-color: ${colors.darkBlue};
  color: ${colors.white};
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  ${(p) => (p.margin ? `margin: ${p.margin};` : "")}
`;

export default PrimaryButton;
