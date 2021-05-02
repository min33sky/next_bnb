import axios from '.';
import { RegisterRoomState } from '../../typings/reduxState';

export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) =>
  axios.post('/api/rooms', body);
