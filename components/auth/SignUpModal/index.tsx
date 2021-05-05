import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/user';
import { authActions } from 'store/auth';
import Input from 'components/Common/Input';
import useInput from 'hooks/useInput';
import useValidateMode from 'hooks/useValidateMode';
import { signupAPI } from 'lib/api/auth';
import Selector from 'components/Common/Selector';
import Button from 'components/Common/Button';
import { monthList, dayList, yearList } from 'lib/staticData';
import PersonIcon from '../../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../../public/static/svg/auth/closed_eye.svg';
import MailIcon from '../../../public/static/svg/auth/mail.svg';
import CloseXIcon from '../../../public/static/svg/modal/modal_colose_x_icon.svg';
import {
  BirthdaySelectorsWrapper,
  Container,
  InputWrapper,
  SubmitButtonWrapper,
} from './styles/signUpModal';
import PasswordWarning from '../PasswordWarning';

const PASSWORD_MIN_LENGTH = 8; //* 비밀번호 최소 자릿수
const disabledMonths = ['월']; //* 선택할 수 없는 월 options
const disabledDays = ['일']; //* 선택할 수 없는 일 options
const disabledYears = ['년']; //* 선택할 수 없는 년 options

interface IProps {
  closeModal: () => void;
}

/**
 * 회원 가입 모달
 * @param closeModal 모달 닫기 함수
 */
export default function SignUpModal({ closeModal }: IProps) {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('');
  const [lastname, onChangeLastname] = useInput('');
  const [firstname, onChangeFirstname] = useInput('');

  const [password, onChangePassword] = useInput('');
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, onChangeBirthYear] = useInput<string | undefined>(undefined);
  const [birthDay, onChangeBirthDay] = useInput<string | undefined>(undefined);
  const [birthMonth, onChangeBirthMonth] = useInput<string | undefined>(undefined);

  const [passwordFocused, setPasswordFocused] = useState(false);

  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      // ? 컴포넌트 언마운트 시 검증 모드를 초기화
      setValidateMode(false);
    };
  }, [setValidateMode]);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode('login'));
  };

  /**
   * password가 이름이나 이메일을 포함하는지
   */
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email]
  );

  /**
   * 비밀번호가 최소 자릿수 이상인지
   */
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  /**
   * 비밀번호가 숫자나 특수기호를 포함하는지
   */
  const isPasswordHasNumberOrSymbol = useMemo(
    () => /[{}[\]/?.,;:|)*~1!^\-_+<>@#$%^&\\=('"]/g.test(password) || /[0-9]/g.test(password),
    [password]
  );

  /**
   * 회원 가입 폼 입력 값 확인하기
   * @returns validation value
   */
  const validateSignUpForm = () => {
    // 인풋 값이 없다면
    if (!email || !lastname || !firstname || !password) return false;

    // 비밀번호가 올바르지 않다면
    if (isPasswordHasNameOrEmail || !isPasswordOverMinLength || !isPasswordHasNumberOrSymbol)
      return false;

    // 생년월일 셀렉터 값이 없다면
    if (!birthDay || !birthMonth || !birthYear) return false;

    return true;
  };

  /**
   * 회원가입 폼 제출하기
   */
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true); // ? 회원가입에 사용되는 모든 Input에 대한 검증 실시

    // 유효성 체크 후 API 호출
    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear!.replace('년', '')}-${birthMonth!.replace('월', '')}-${birthDay!.replace(
              '일',
              ''
            )}`
          ).toISOString(), // 생년월일의 년원일을 제거
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

  /**
   * 비밀번호 인풋 포커스 되었을 때
   */
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
            !isPasswordHasNameOrEmail && isPasswordOverMinLength && isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
      </InputWrapper>

      {
        // ? 패스워드를 입력할 때 패스워드 등록에 관한 설명 표시
        passwordFocused && (
          <>
            <PasswordWarning
              isValid={!isPasswordHasNameOrEmail}
              text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
            />
            <PasswordWarning isValid={isPasswordOverMinLength} text="최소 8자리를 입력하세요." />
            <PasswordWarning
              isValid={isPasswordHasNumberOrSymbol}
              text="숫자나 기호를 포함하세요"
            />
          </>
        )
      }

      <p className="sign-up-birthday-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비앤비 이용자에게
        공개되지 않습니다.
      </p>

      <BirthdaySelectorsWrapper>
        <div className="month">
          <Selector
            options={monthList}
            disabledOptions={disabledMonths}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="day">
          <Selector
            options={dayList}
            disabledOptions={disabledDays}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="year">
          <Selector
            options={yearList}
            disabledOptions={disabledYears}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </BirthdaySelectorsWrapper>

      <SubmitButtonWrapper>
        <Button type="submit" color="bittersweet">
          가입하기
        </Button>
      </SubmitButtonWrapper>

      <p>
        이미 에어비앤비 계정이 있나요?
        <span className="sign-up-modal-set-login" role="presentation" onClick={changeToLoginModal}>
          로그인
        </span>
      </p>
    </Container>
  );
}
