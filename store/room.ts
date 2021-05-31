import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomState } from 'typings/reduxState';
import { RoomType } from '../typings/room.d';

const initialState: RoomState = {
  rooms: [],
};

const room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
      return state;
    },
  },
});

export const roomActions = { ...room.actions };

export default room;
