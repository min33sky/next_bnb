import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    /* next에서는 public폴더에 있는 정적 파일을 접근할 수 있다. */
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }

  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? 'white' : palette.snow};
      }
    `}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
}

/**
 * 셀렉터 컴포넌트
 * @param options 선택 가능한 값
 * @param disabledOptions 선택 불가능한 값 (선택 값의 속성명)
 * @param isValid 유효성 체크
 *
 */
export default function Selector({
  options = [],
  disabledOptions = [],
  isValid,
  ...props
}: IProps) {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={validateMode}>
      <select {...props}>
        {
          // ? 선택 불가능한 값 (선택할 수 있는 값의 속성명)
          disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))
        }
        {
          // ? 선택 가능한 값
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        }
      </select>
    </Container>
  );
}
