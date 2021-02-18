import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

/**
 * 버튼 색상을 정하는 함수
 * @param color 버튼 색상
 */
const getButtonColor = (color: string) => {
  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
      `;

    case 'white':
      return css`
        background-color: white;
      `;

    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

const NormalButtonStyle = css`
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

const RegisterButtonStyle = css`
  width: 161px;
  height: 45px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

const Container = styled.button<{ styleType: 'normal' | 'register' }>`
  ${({ styleType }) =>
    styleType === 'register' ? RegisterButtonStyle : NormalButtonStyle}

  ${(props) => getButtonColor(props.color || '')}
`;

//* ------------------------------------------------------------------------------------- //

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan' | 'white';
  styleType?: 'normal' | 'register';
}

/**
 * 버튼 컴포넌트
 * @param children 버튼 이름
 * @param color 버튼 색깔
 * @param styleType 일반 버튼 | 등록 버튼
 */
function Button({ children, color, styleType = 'normal', ...props }: IProps) {
  return (
    <Container {...props} color={color} styleType={styleType}>
      {children}
    </Container>
  );
}

export default React.memo(Button);
