import { createGlobalStyle } from "styled-components";

import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'IBM Plex Sans';
    box-sizing: border-box;
    margin: 0;
  }

  input {
    outline: none;
    font: inherit;
    font-size: inherit;
    background-color: inherit;
    color: inherit;
    border: 1px solid ${colors.black};
  }

  button {
    display: inline-flex;
    cursor: pointer;
    color: inherit;
    background-color: inherit;
    border: none;
    padding: 0;
  }

  button:active {
    border-style: none;
  }
`;

export default GlobalStyle;
