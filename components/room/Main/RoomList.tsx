import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RoomCard from './RoomCard';

const Container = styled.ul`
  background-color: silver;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  width: 100%;
`;

interface IProps {
  showMap: boolean;
}

export default function RoomList({ showMap }: IProps) {
  const rooms = useSelector((state) => state.room.rooms);

  return (
    <Container>
      {rooms.map((room) => (
        <RoomCard room={room} showMap={showMap} key={room.id} />
      ))}
    </Container>
  );
}
