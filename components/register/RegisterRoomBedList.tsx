import React from 'react';
import { useSelector } from 'react-redux';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

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
