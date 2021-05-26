import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
`;

/**
 * 검색 바
 * @returns Search Input
 */
export default function SearchRoomBar() {
  return (
    <Container>
      <div className="search-room-bar-inputs" />
    </Container>
  );
}
