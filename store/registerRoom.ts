import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
};

const initialState: RegisterRoomState = {
  // 건물 유형 큰 범주
  largeBuildingType: null,
  // 건물 유형
  buildingType: null,
  // 숙소 유형
  roomType: null,
  // 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: null,
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    // 큰 범위 건물 유형 변경
    setLargeBuildingType(state, action: PayloadAction<string>) {
      state.largeBuildingType = action.payload;
    },
  },
});

export const registerActions = { ...registerRoom.actions };

export default registerRoom;
