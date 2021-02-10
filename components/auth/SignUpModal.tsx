import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { userActions } from '../../store/user';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';

//* 비밀번호 최소 자릿수
const PASSWORD_MIN_LENGTH = 8;

const Container = styled.form`
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

  .sign-up-modal-set-login {
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

  /* 월 */
  & > :first-child {
    margin-right: 16px;
    flex-grow: 1;
  }

  /* 일 */
  & > :nth-child(2) {
    margin-right: 16px;
    width: 25%;
  }

  /* 년도 */
  & > :last-child {
    width: 33.3%;
  }
`;

interface IProps {
  closeModal: () => void;
}

/**
 * 회원 가입 모달
 * @param closeModal 모달 닫기 함수
 */
export default function SignUpModal({ closeModal }: IProps) {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();

  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 검증 모드를 안함으로 설정
      setValidateMode(false);
    };
  }, [setValidateMode]);

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

  //* password가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email]
  );

  //* 비밀번호가 최소 자릿수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  //* 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~1!^\-_+<>@#$%^&\\=('"]/g.test(password) ||
      /[0-9]/g.test(password),
    [password]
  );

  //* 회원 가입 폼 입력 값 확인하기
  const validateSignUpForm = () => {
    // 인풋 값이 없다면
    if (!email || !lastname || !firstname || !password) return false;

    // 비밀번호가 올바르지 않다면
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      !isPasswordHasNumberOrSymbol
    )
      return false;

    // 생년월일 셀렉터 값이 없다면
    if (!birthDay || !birthMonth || !birthYear) return false;

    return true;
  };

  //* 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true); // Input에 대한 검증 실시를 스토어에 저장

    // 유효성 체크 후 API 호출
    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear!.replace('년', '')}-${birthMonth!.replace(
              '월',
              ''
            )}-${birthDay!.replace('일', '')}`
          ).toISOString(),
        };

        const { data } = await signupAPI(signUpBody);
        // 응답 결과를 스토어에 저장
        dispatch(userActions.setLoggedUser(data));

        closeModal();

        console.log('가입 완료', data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //* 비밀번호 인풋 포커스 되었을 때
  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <InputWrapper>
        <Input
          type="email"
          name="email"
          placeholder="이메일 주소"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="이름(예: 지은)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 입력하세요."
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="성(예: 이)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="성을 입력하세요."
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
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
      </InputWrapper>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={!isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning
            isValid={isPasswordOverMinLength}
            text="최소 8자리를 입력하세요."
          />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 포함하세요"
          />
        </>
      )}

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
            isValid={!!birthMonth}
          />
        </div>
        <div className="day">
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="year">
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </SelectorsWrapper>

      <ButtonWrapper>
        <Button type="submit">가입하기</Button>
      </ButtonWrapper>

      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={() => alert('준비중')}
        >
          로그인
        </span>
      </p>
    </Container>
  );
}
