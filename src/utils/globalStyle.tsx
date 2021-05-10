import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: url("./background.jpg") center center;
    background-size: cover;
    height: 100vh;
    font-family: 'Lato', sans-serif;
  }
`;
