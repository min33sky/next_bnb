import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'styles/palette';

/**
 * 버튼 색상 구하기
 * @param color 버튼 색상
 * @param colorReverse 버튼 색상 반전
 * @returns 버튼 색상 css 함수
 */
const getButtonColor = (
  color: 'dark_cyan' | 'bittersweet' | 'white' | 'amaranth' | undefined,
  colorReverse: boolean
) => {
  if (colorReverse) {
    switch (color) {
      case 'dark_cyan':
        return css`
          border: 2px solid ${palette.dark_cyan};
          color: ${palette.dark_cyan};
          background-color: white;
        `;

      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }

  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
        color: white;
      `;

    case 'bittersweet':
      return css`
        background-color: ${palette.bittersweet};
        color: white;
      `;

    case 'amaranth':
      return css`
        background-color: ${palette.amaranth};
        color: white;
      `;

    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

/**
 * 버튼의 크기 구하기
 * @param size 버튼 사이즈
 * @returns 버튼 크기 css
 */
const getButtonSize = (size: 'small' | 'medium') => {
  switch (size) {
    case 'medium':
      return css`
        height: 48px;
      `;

    case 'small':
      return css`
        font-size: 14px;
        height: 36px;
      `;
    default:
      return '';
  }
};

const normalButtonStyle = css`
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

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
  styleType: 'normal' | 'register';
  color?: 'dark_cyan' | 'bittersweet' | 'white' | 'amaranth';
  size: 'small' | 'medium';
}

const Container = styled.button<StyledButtonProps>`
  ${({ styleType }) => (styleType === 'register' ? RegisterButtonStyle : normalButtonStyle)}

  ${(props) => getButtonColor(props.color, props.colorReverse)}
  ${(props) => getButtonSize(props.size)}

  width: ${(props) => props.width};

  /* 버튼 아이콘 */
  svg {
    margin-right: 12px;
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan' | 'bittersweet' | 'white' | 'amaranth';
  width?: string;
  colorReverse?: boolean;
  styleType?: 'normal' | 'register';
  icon?: JSX.Element;
  size?: 'small' | 'medium';
}

/**
 * 버튼 컴포넌트
 * @param children 버튼 이름
 * @param color 버튼 색깔
 * @param width 버튼 너비
 * @param colorReverse 버튼 색상 반전
 * @param icon 버튼 아이콘
 * @param size 버튼 크기
 */
function Button({
  children,
  color,
  width,
  colorReverse = false,
  styleType = 'normal',
  icon,
  size = 'medium',
  ...props
}: IProps) {
  return (
    <Container
      {...props}
      styleType={styleType}
      color={color}
      width={width}
      colorReverse={colorReverse}
      size={size}
    >
      {icon}
      {children}
    </Container>
  );
}

export default React.memo(Button);
