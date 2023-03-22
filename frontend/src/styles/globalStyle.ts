import { createGlobalStyle } from 'styled-components';

// pallette
// #000000
// #14213d
// #fca311
// #e5e5e5
// #ffffff

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: #e5e5e5;
    color: #14213d;
  }

  body, input, select, textarea, button {
    font: 400 1rem "Roboto", Sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;