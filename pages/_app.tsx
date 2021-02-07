import { AppProps } from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

/**
 * App의 전체 Layout
 * ? root-modal: React-Portal이 사용할 DOM
 * @param Component 페이지 컴포넌트
 * @param pageProps SSR로 컴포넌트에 전달해 줄 Props
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
}
