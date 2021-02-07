import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';

const Container = styled.div`
  position: fixed;
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
`;

/**
 * 앱의 공통 헤더
 */
export default function Header() {
  return (
    <Container>
      <Link href="/">
        <HeaderLogoWrapper>
          <AirbnbLogoIcon />
          <AirbnbLogoTextIcon />
        </HeaderLogoWrapper>
      </Link>
    </Container>
  );
}
