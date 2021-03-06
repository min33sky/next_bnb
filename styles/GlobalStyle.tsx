import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import palette from './palette';

const globalStyle = css`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: Noto sans-serif, Noto Sans KR;
    color: ${palette.black};
  }

  a {
    text-decoration: none;
    color: ${palette.black};
  }
`;

/**
 * App의 글로벌 스타일 설정
 */
const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
