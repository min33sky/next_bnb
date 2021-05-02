import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import AirbnbLogoIcon from '../../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../../public/static/svg/logo/logo_text.svg';
import { Container } from './styles/header';
import AuthButtons from './AuthButtons';
import UserProfileButtons from './UserProfileButtons';

/**
 * App Common Header
 * @returns Header Component
 */
export default function Header() {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>

      {
        //* 비로그인 시 보여줄 메뉴
        !isLogged && <AuthButtons />
      }

      {
        //* 로그인 시 보여줄 메뉴 버튼과 관련 메뉴
        isLogged && <UserProfileButtons />
      }
    </Container>
  );
}
