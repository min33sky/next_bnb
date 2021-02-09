import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * 버튼 컴포넌트
 * @param children 버튼 이름
 */
export default function Button({ children, ...props }: IProps) {
  return <Container {...props}>{children}</Container>;
}