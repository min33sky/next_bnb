import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

/**
 * 전체 유저 리스트를 DB에서 불러오는 함수
 */
const getList = () => {
  const usersBuffer = readFileSync('data/users.json');
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

/**
 * 해당 유저가 DB에 존재 유무 확인
 * @param email Email
 */
const exist = ({ email }: { email: string }) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

/**
 * DB에 사용자 목록 저장하기
 * ! async 제거해야할 듯?????
 * @param users 사용자 목록
 */
const write = async (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users));
};

/**
 * 해당 Email 유저 정보 찾기
 * @param email Email
 * @param id Id
 */
const find = ({ email, id }: { email?: string; id?: number }) => {
  const users = getList();
  return users.find((user) => user.email === email || user.id === id);
};

export default {
  getList,
  exist,
  write,
  find,
};
