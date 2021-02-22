import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

/**
 * 버튼 색상을 정하는 함수
 * @param color 버튼 색상
 * @param colorReverse 색상 리버스
 */
const getButtonColor = (color: string, colorReverse: boolean) => {
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

    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || '', props.colorReverse)}

  svg {
    margin-right: 12px;
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan' | 'bittersweet';
  width?: string;
  colorReverse?: boolean;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
}

/**
 * 버튼 컴포넌트
 * @param children 버튼 이름
 * @param color 버튼 색깔
 * @param width 버튼 너비
 * @param colorReverse 버튼 색상 반전
 * @param icon 버튼 아이콘
 */
function Button({
  children,
  color,
  width,
  colorReverse = false,
  icon,
  ...props
}: IProps) {
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
    >
      {icon}
      {children}
    </Container>
  );
}

export default React.memo(Button);
