import { makeQueryString } from 'lib/utils';
import { RegisterRoomState } from 'typings/reduxState';
import { RoomType } from 'typings/room';
import fetch from '.';

/**
 * 숙소 등록 API 호출 함수
 * @param body 등록할 숙소 데이터
 * @returns
 */
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) =>
  fetch.post('/api/rooms', body);

type GetRoomListAPIQueries = {
  location?: string | string[];
  checkInDate?: string | string[];
  checkOutDate?: string | string[];
  adultCount?: string | string[];
  childrenCount?: string | string[];
  infantsCount?: string | string[];
  latitude?: string | string[];
  longitude?: string | string[];
  limit?: string | string[];
  page: string | string[];
};

/**
 * 숙소 리스트 불러오는 API 호출 함수
 * @param queries
 * @returns
 */
export const getRoomListAPI = (queries: GetRoomListAPIQueries) =>
  fetch.get<RoomType[]>(makeQueryString(`/api/rooms`, queries));
