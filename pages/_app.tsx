import App, { AppContext, AppProps } from 'next/app';
import axios from '../lib/api';
import Header from '../components/Header';
import { cookieStringToObject } from '../lib/utils';
import { wrapper } from '../store';
import GlobalStyle from '../styles/GlobalStyle';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

/**
 * App의 전체 Layout
 * ? root-modal: React Portal이 사용할 DOM
 * @param Component 페이지 컴포넌트
 * @param pageProps SSR로 컴포넌트에 전달해 줄 Props
 */
const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  console.log(cookieObject);

  const { store } = context.ctx; // ? next-redux-wrapper 덕분에 store를 사용할 수 있다.
  const { isLogged } = store.getState().user;

  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token; // ? api 요청헤더에 쿠키를 저장
      const { data } = await meAPI();
      console.log('쿠키 파싱 데이터', data);
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (error) {
    console.log(error);
  }

  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
