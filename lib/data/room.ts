import { readFileSync, writeFileSync } from 'fs';
import { StoredRoomType } from '../../types/room.d';
/**
 * 숙소 리스트 데이터 불러오기
 */
const getList = () => {
  const roomBuffer = readFileSync('data/rooms.json');
  const roomsString = roomBuffer.toString();
  if (!roomsString) {
    return [];
  }
  const rooms: StoredRoomType[] = JSON.parse(roomsString);
  return rooms;
};

/**
 * 해당 ID의 숙소가 존재하는지 확인
 * @param roomId 숙소 ID
 * @returns boolean
 */
const exist = (roomId: number) => {
  const rooms = getList();
  return rooms.some((room) => room.id === roomId);
};

/**
 * 해당 ID의 숙소 정보 가져오기
 * @param roomId 숙소 ID
 * @returns StoredRoomType | undefined
 */
const find = (roomId: number) => {
  const rooms = getList();
  return rooms.find((room) => room.id === roomId);
};

/**
 * 숙소 리스트 저장하기
 * @param rooms 숙소 리스트
 */
const write = (rooms: StoredRoomType[]) => {
  writeFileSync('data/rooms.json', JSON.stringify(rooms));
};

export default { getList, exist, write, find };
