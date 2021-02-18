import axios from 'axios';

// API 호출 시 서버 주소를 생략하기 위해 baseURL을 설정
const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default fetch;
