import { RegisterRoomState } from 'typings/reduxState';
import fetch from '.';

/**
 * 숙소 등록 API 호출 함수
 * @param body 등록할 숙소 데이터
 * @returns
 */
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) =>
  fetch.post('/api/rooms', body);
