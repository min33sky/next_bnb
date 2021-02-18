import React from 'react';
import styled from 'styled-components';
import RedXIcon from '../../public/static/svg/auth/red_x_icon.svg';
import GreenCheckIcon from '../../public/static/svg/auth/green_check_icon.svg';
import palette from '../../styles/palette';

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.green : palette.davidson_orange};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

//* ------------------------------------------------------------------------------------- //

/**
 * 패스워드에 관한 경고를 보여주는 컴포넌트
 * @param isValid 유효성 체크
 * @param text 패스워드 입력값에 대한 경고 메세지
 */
export default function PasswordWarning({ isValid, text }: IProps) {
  return (
    <Container isValid={isValid}>
      {isValid ? <GreenCheckIcon /> : <RedXIcon />}
      {text}
    </Container>
  );
}
