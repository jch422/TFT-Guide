import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
    }
    html {
        overflow-y: scroll;
    }
    body{
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
    };
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
