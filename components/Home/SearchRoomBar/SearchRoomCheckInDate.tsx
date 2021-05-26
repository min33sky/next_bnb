import React from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
`;

export default function SearchRoomCheckInDate() {
  return <Container>체크인</Container>;
}
