/**
 * 쿠키 문자열을 객체로 바꿔주는 함수
 * - 'token=value'를 {token:'value'}
 * @param cookieString 쿠키 문자열
 */
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    //* ex) cookieString = 'token=value; messi=barca; son=spurs';
    const itemString = cookieString?.split(/\s*;\s/);
    //* ex) itemString = ['token=value', 'messi=barca', 'son=spurs']
    itemString.forEach((pairs) => {
      //* ex) pairs = 'token=value'
      const pair = pairs.split(/\s*=\s*/);
      //* ex) pair = ['token', 'value']
      cookies[pair[0]] = pair.slice(1).join('=');
    });
  }
  return cookies;
};

/**
 * 문자열에서 숫자만 리턴하는 함수
 * @param string 문자열
 */
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join('');
  if (numbers) {
    return Number(numbers);
  }
  return null;
};

/**
 * 천 단위로 ,를 찍어주는 함수
 * @param input 숫자
 */
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, '');
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return '';
};
