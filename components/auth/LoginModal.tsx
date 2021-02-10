import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailICon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import Input from '../common/Input';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { authActions } from '../../store/auth';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;

    :hover {
      color: ${palette.orange};
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;

  svg {
    position: absolute;
    right: 11px;
    top: 16px;
  }

  &.login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

interface IProps {
  closeModal: () => void;
}

/**
 * 로그인 모달
 * @param closeModal 모달 종료 함수
 */
export default function LoginModal({ closeModal }: IProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode('signup'));
  };

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<MailICon />}
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper className="login-password-input-wrapper">
        <Input
          placeholder="비밀번호 입력"
          type={isPasswordHided ? 'password' : 'text'}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>

      <ButtonWrapper>
        <Button type="submit">로그인</Button>
      </ButtonWrapper>

      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="login-modal-set-signup"
          onClick={changeToSignUpModal}
          role="presentation"
        >
          회원 가입
        </span>
      </p>
    </Container>
  );
}
