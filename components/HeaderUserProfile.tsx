import Link from 'next/link';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import palette from '../styles/palette';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

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
 * 로그인 시 헤더에 보여줄 메뉴
 */
export default function HeaderUserProfile() {
  const dispatch = useDispatch();
  const userProfileImage = useSelector((state) => state.user.profileImage);

  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false); // 로그인 유저 메뉴 버튼 클릭 여부

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser()); // 스토어의 로그인 상태도 초기화
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   *? OutsiceClickHandler: 현재 컴포넌트(메뉴) 밖을 클릭하면 이벤트를 발생시키는 컴포넌트
   */

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpened) {
          setIsUsermenuOpened(false);
        }
      }}
    >
      <ProfileButton onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}>
        <HamburgerIcon />
        <img src={userProfileImage} alt="UserImage" />
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
  );
}