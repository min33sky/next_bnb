import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

const Container = styled.ul`
  width: 548px;
`;

/**
 * 침실의 침대 타입과 개수 설정
 */
export default function RegisterRoomBedList() {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <Container>
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </Container>
  );
}
