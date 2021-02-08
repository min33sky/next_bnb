import React, { useState } from 'react';
import styled from 'styled-components';
import PersonIcon from '../../public/static/svg/logo/person.svg';
import OpenedEyeIcon from '../../public/static/svg/logo/opened-eye.svg';
import ClosedEyeIcon from '../../public/static/svg/logo/closeed-eye.svg';
import MailIcon from '../../public/static/svg/logo/mail.svg';
import CloseXIcon from '../../public/static/svg/logo/modal_close_x_icon.svg';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import palette from '../../styles/palette';
import Button from '../common/Button';

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

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
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

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

const SelectorsWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;

  & > :first-child {
    margin-right: 16px;
    flex-grow: 1;
  }

  & > :nth-child(2) {
    margin-right: 16px;
    width: 25%;
  }

  & > :last-child {
    width: 33.3%;
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

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

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

      <p className="sign-up-birthday-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>

      <SelectorsWrapper>
        <div className="month">
          <Selector
            options={monthList}
            disabledOptions={['월']}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="day">
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className="year">
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </SelectorsWrapper>

      <ButtonWrapper>
        <Button type="submit">가입하기</Button>
      </ButtonWrapper>
    </Container>
  );
}
