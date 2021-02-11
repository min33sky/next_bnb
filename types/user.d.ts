// users.json에 저장된 유저 타입
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};

// 클라이언트에 전달될 유저 타입 (Password 제거)
export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};
