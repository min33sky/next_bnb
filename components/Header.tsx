import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import palette from '../styles/palette';
import useModal from '../hooks/useModal';
import { authActions } from '../store/auth';
import AuthModal from './auth/AuthModal';

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
`;

const SignupButton = styled.button`
  height: 42px;
  margin-right: 8px;
  padding: 0 16px;
  border: 0;
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const LoginButton = styled.button`
  height: 42px;
  padding: 0 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

const HeaderUserProfile = styled.button`
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 6px 0 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }

  img {
    margin-left: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

/**
 * Airbnb 공통 헤더
 */
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { openModal, ModalPortal, closeModal } = useModal();

  return (
    <Container>
      <Link href="/">
        <HeaderLogoWrapper>
          <AirbnbLogoIcon />
          <AirbnbLogoTextIcon />
        </HeaderLogoWrapper>
      </Link>

      {!user.isLogged && (
        <div>
          <SignupButton
            onClick={() => {
              dispatch(authActions.setAuthMode('signup'));
              openModal();
            }}
          >
            회원 가입
          </SignupButton>
          <LoginButton
            onClick={() => {
              dispatch(authActions.setAuthMode('login'));
              openModal();
            }}
          >
            로그인
          </LoginButton>
        </div>
      )}

      {user.isLogged && (
        <HeaderUserProfile>
          <HamburgerIcon />
          <img src={user.profileImage} alt="UserImage" />
        </HeaderUserProfile>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
}
