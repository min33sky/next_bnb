import React from 'react';
import { useDispatch } from 'react-redux';
import useModal from 'hooks/useModal';
import { authActions } from 'store/auth';
import AuthModal from 'components/auth/AuthModal';
import { LoginButton, SignupButton } from './styles/authButtons';

/**
 * 헤더의 인증 관련 버튼
 * @returns Auth Buttons (In Header)
 */
export default function AuthButtons() {
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

      {/** React-Portal에 랜더링 할 모달 컴포넌트 */}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
}
