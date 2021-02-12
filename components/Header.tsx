import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import HeaderAuths from './HeaderAuths';
import HeaderUserProfile from './HeaderUserProfile';

const Container = styled.div`
  position: fixed; /* 모달을 띄어도 헤더는 보이게 처리 */
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
`;

const HeaderLogoWrapper = styled.div`
  display: flex;
  align-items: center;

  /* 로고 아이콘 */
  & > :first-child {
    margin-right: 6px;
  }

  /* react-outside-click-handelr div의 포지션 설정 */
  & + div {
    position: relative; //? 포지션이 absoulte인 사용자 메뉴의 위치를 잡기 위해서
  }
`;

/**
 * Airbnb 공통 헤더
 */
export default function Header() {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <Container>
      <Link href="/">
        <HeaderLogoWrapper>
          <AirbnbLogoIcon />
          <AirbnbLogoTextIcon />
        </HeaderLogoWrapper>
      </Link>

      {
        //* 비로그인 시 보여줄 메뉴
        !isLogged && <HeaderAuths />
      }

      {
        //* 로그인 시 보여줄 메뉴 버튼과 관련 메뉴
        isLogged && <HeaderUserProfile />
      }
    </Container>
  );
}
