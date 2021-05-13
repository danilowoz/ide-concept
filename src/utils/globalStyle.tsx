import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: url("./background.jpg") center center;
    background-size: cover;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  #root {
    display: flex;
    width: 100vw;
    height: 100vh;
  }
`;
