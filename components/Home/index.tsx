import React from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';
import SearchRoomBar from './SearchRoomBar';

const Container = styled.div`
  width: 100%;
  background-color: violet; // !지울꺼야
  padding: 0 80px;

  .home-search-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 14px;
  }

  h2 {
    width: 557px;
    margin: 80px 0 60px;
    font-size: 50px;
    color: ${palette.cardinal};
  }
`;

/**
 * 메인 시작 페이지 컴포넌트
 * @returns Home Component
 */
export default function Home() {
  return (
    <Container>
      <p className="home-search-bar-label">숙소</p>
      <SearchRoomBar />
      <h2>가까운 여행지, 에어비앤비와 탐험해보세요.</h2>
    </Container>
  );
}
