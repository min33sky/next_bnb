import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BedType } from 'typings/room';

/**
 * 등록할 숙소의 타입
 */
type RegisterRoomState = {
  // 숙소
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

const initialState: RegisterRoomState = {
  // ? 1단계
  // 건물 유형 큰 범주
  largeBuildingType: null,
  // 건물 유형
  buildingType: null,
  // 숙소 유형
  roomType: null,
  // 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: null,

  // ? 2단계
  // 최대 숙박 인원
  maximumGuestCount: 1,
  // 침실 개수
  bedroomCount: 0,
  // 침대 개수
  bedCount: 1,
  // 침대 유형
  bedList: [],
  // 공용공간 침대 유형
  publicBedList: [],

  // ? 3단계
  // 욕실 개수
  bathroomCount: 1,
  // 욕실 유형
  bathroomType: null,

  // ? 4단계
  // 국가 / 지역
  country: '',
  // 시 / 도
  city: '',
  // 시 / 군 / 구
  district: '',
  // 도로명 주소
  streetAddress: '',
  // 세부 주소
  detailAddress: '',
  // 우편번호
  postcode: '',
  // 위도
  latitude: 0,
  // 경도
  longitude: 0,

  // 편의 시설
  amentities: [],

  // 편의 공간
  conveniences: [],

  // 숙소 사진
  photos: [
    'https://jerrynim-next-bnb.s3.ap-northeast-2.amazonaws.com/room_image_1_2x__5e286c64-83c9-4377-9967-240b6e1e4844.jpg',
    'https://jerrynim-next-bnb.s3.ap-northeast-2.amazonaws.com/room_image_1_2x__5e286c64-83c9-4377-9967-240b6e1e4844.jpg',
    'https://jerrynim-next-bnb.s3.ap-northeast-2.amazonaws.com/room_image_1_2x__5e286c64-83c9-4377-9967-240b6e1e4844.jpg',
  ],

  // 숙소 설명
  description: '',

  // 숙소 제목
  title: '',

  // 숙소 요금
  price: 0,

  // 예약 시작 날짜
  startDate: null,

  // 예약 종료 날짜
  endDate: null,
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    //* 큰 범위 건물 유형 변경
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },

    //* 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },

    //* 숙소 유형 설정하기
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
      return state;
    },

    //* '게스트용 숙소인지' 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },

    //* 최대 숙박 인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },

    //* 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      /**
       * 침실 개수의 변경에 따라 bedList도 변경된다.
       */

      if (bedroomCount < bedList.length) {
        //* 변경될 침대 개수보다 기존 침대 개수가 더 많으면 초과 부분 잘라내기
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        //* 침실 개수가 현재 침대 리스트 개수보다 크면 침실 개수만큼 침대를 채운다
        for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }

      state.bedList = bedList;

      return state;
    },

    //* 최대 침대 개수 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },

    //* 침대 유형 개수 변경하기
    setBedTypeCount(
      state,
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        // 해당 침대 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }

      if (count === 0) {
        // 타입은 있지만 개수가 0일때 배열에서 삭제한다.
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        // 타입이 존재할 때
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },

    //* 공용공간 침대 유형 개수 변경하기
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType; count: number }>) {
      const { count, type } = action.payload;
      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 동일 타입이 없다면 추가
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      if (count === 0) {
        state.publicBedList.splice(index, 1); // 배열에서 삭제
      } else {
        state.publicBedList[index].count = count;
      }
      return state;
    },

    // ? 숙소 등록 3단계
    // 욕실 개수 변경하기
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },

    // 욕실 유형 변경하기
    setBathroomType(state, action: PayloadAction<'private' | 'public'>) {
      state.bathroomType = action.payload;
      return state;
    },

    // ? 숙소등록 4단계
    // 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
      return state;
    },

    // 시/도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      return state;
    },

    // 시/군/구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
      return state;
    },

    // 도로명 주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
      return state;
    },

    // 동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
      return state;
    },

    // 우편변호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
      return state;
    },

    // 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
      return state;
    },

    // 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
      return state;
    },

    // 편의 시설 변경하기
    setAmentities(state, action: PayloadAction<string[]>) {
      state.amentities = action.payload;
      return state;
    },

    // 편의 공간 변경하기
    setConveniences(state, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
      return state;
    },

    // 숙소 사진 변경하기
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
      return state;
    },

    // 숙소 설명 변경하기
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
      return state;
    },

    // 숙소 제목 변경하기
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
      return state;
    },

    // 숙소 요금 변경하기
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
      return state;
    },

    // 예약 시작 날짜 변경하기
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload;
      return state;
    },

    // 예약 종료 날짜 변경하기
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
