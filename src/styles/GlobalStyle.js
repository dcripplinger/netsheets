import { createGlobalStyle } from "styled-components";

import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    font-family: 'IBM Plex Sans';
    font-size: 16px;
  }  

  body {
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

  :focus-visible {
    outline: dashed ${colors.lightBlue} 1px;
    outline-offset: 1px;
  }
`;

export default GlobalStyle;
