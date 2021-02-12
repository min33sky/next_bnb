import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import { authActions } from '../store/auth';
import palette from '../styles/palette';
import AuthModal from './auth/AuthModal';

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

/**
 * 비로그인 시 보여줄 헤더 메뉴
 */
export default function HeaderAuths() {
  const dispatch = useDispatch();

  const { openModal, ModalPortal, closeModal } = useModal();

  return (
    <>
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

      {/** Portal에 랜더링 할 모달 컴포넌트 */}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
}
