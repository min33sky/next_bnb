import React from 'react';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

interface IProps {
  closeModal: () => void;
}

/**
 * 스토어 상태에 따라서 로그인 / 회원가입 모달을 보여주는 컴포넌트
 * @param closeModal 모달 종료 함수
 */
export default function AuthModal({ closeModal }: IProps) {
  const authMode = useSelector((state) => state.auth.authMode);

  return (
    <>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </>
  );
}
