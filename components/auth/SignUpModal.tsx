import React, { useState } from 'react';
import styled from 'styled-components';
import PersonIcon from '../../public/static/svg/logo/person.svg';
import OpenedEyeIcon from '../../public/static/svg/logo/opened-eye.svg';
import ClosedEyeIcon from '../../public/static/svg/logo/closeed-eye.svg';
import MailIcon from '../../public/static/svg/logo/mail.svg';
import CloseXIcon from '../../public/static/svg/logo/modal_close_x_icon.svg';
import palette from '../../styles/palette';
import Input from '../common/input';
import useModal from '../../hooks/useModal';

const Container = styled.div`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  & > .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
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

  &.sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

/**
 * 회원 가입 모달
 */
export default function SignUpModal() {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <CloseXIcon
        className="modal-close-x-icon"
        onClick={() => {
          console.log('아직 안됨');
        }}
      />
      <InputWrapper>
        <Input
          type="email"
          name="email"
          placeholder="이메일 주소"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="이름(예: 지은)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="성(예: 이)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </InputWrapper>
      <InputWrapper className="sign-up-password-input-wrapper">
        <Input
          type={hidePassword ? 'password' : 'text'}
          placeholder="비밀번호 설정하기"
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
    </Container>
  );
}
