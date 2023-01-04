import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
        margin:0;
        *{
            transition:background-color, color 0.15s linear;
        }
    }
    ::-webkit-scrollbar {
        display: none;
    }
`;
