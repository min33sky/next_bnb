import React from 'react';
import { useSelector } from 'react-redux';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

/**
 * 침실의 침대 타입과 개수 설정
 */
export default function RegisterRoomBedList() {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <ul className="register-room-bed-type-list-wrapper">
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
}
