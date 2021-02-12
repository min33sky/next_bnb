import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import palette from '../styles/palette';
import useModal from '../hooks/useModal';
import { authActions } from '../store/auth';
import AuthModal from './auth/AuthModal';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

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

const ProfileButton = styled.button`
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

  /* 사용자 이미지 */
  img {
    margin-left: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

// 로그인 유저 전용 메뉴
const HeaderUsermenu = styled.ul`
  position: absolute;
  right: 0;
  top: 52px;
  width: 240px;
  padding: 8px 0;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: white;

  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }

  .header-usermenu-divider {
    width: 100%;
    height: 1px;
    margin: 8px 0;
    background-color: ${palette.gray_dd};
  }
`;

/**
 * Airbnb 공통 헤더
 */
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false); // 로그인 유저 메뉴 버튼 클릭

  const { openModal, ModalPortal, closeModal } = useModal(); // 모달 훅

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser()); // 스토어의 로그인 상태도 초기화
    } catch (error) {
      console.log(error.message);
    }
  };

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
        !user.isLogged && (
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
        )
      }

      {
        //* 로그인 시 보여줄 메뉴 버튼과 관련 메뉴
        user.isLogged && (
          <OutsideClickHandler
            onOutsideClick={() => {
              if (isUsermenuOpened) {
                setIsUsermenuOpened(false);
              }
            }}
          >
            <ProfileButton
              onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
            >
              <HamburgerIcon />
              <img src={user.profileImage} alt="UserImage" />
            </ProfileButton>
            {isUsermenuOpened && (
              <HeaderUsermenu>
                <li>숙소 관리</li>
                <Link href="/room/register/building">
                  <a>
                    <li>숙소 등록하기</li>
                  </a>
                </Link>
                <div className="header-usermenu-divider" />
                <li role="presentation" onClick={logout}>
                  로그아웃
                </li>
              </HeaderUsermenu>
            )}
          </OutsideClickHandler>
        )
      }

      {/** Portal에 랜더링 할 모달 컴포넌트 */}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
}
