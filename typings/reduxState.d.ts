import { UserType } from './user';
import { BedType } from './room';

//* 유저 Redux State (서버에서 응답한 유저 객체 타입에 로그인 여부를 추가시킴)
export type UserState = UserType & {
  isLogged: boolean;
};

//* 공통 Redux state
export type CommonState = {
  validateMode: boolean; // 해당 인풋에 대한 검증 모드 유무
};

//* 숙소 등록 state
export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;

  // 침실
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];

  // 욕실
  bathroomCount: number;
  bathroomType: 'private' | 'public' | null;

  // 위치
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;

  // 편의 시설
  amentities: string[];

  // 편의 공간
  conveniences: string[];

  // 숙소 사진
  photos: string[];

  // 숙소 설명
  description: string;

  // 숙소 제목
  title: string;

  // 숙소 요금
  price: number;

  // 예약 시작 날짜
  startDate: string | null;
  endDate: string | null;
};
