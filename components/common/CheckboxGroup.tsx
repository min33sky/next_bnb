import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
  /* clear: both를 부여할 가짜 요소 */
  &:after {
    display: block;
    content: '';
    clear: both; /* float한 다음에 해제를 해줘야 한다 */
  }

  .checkbox-label {
    position: relative;
    height: 18px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    color: ${palette.gray_48};
    cursor: pointer;
    float: left;
    clear: both;
  }

  /* ie input x버튼 삭제 */
  input::-ms-clear {
    display: none;
  }

  input[type='checkbox'] {
    margin: 0;
    border: 0;
    width: 0;
    height: 0;
    -webkit-appearance: none;
  }

  input[type='checkbox']:checked {
    margin: 0;
    border: 0;
    -webkit-appearance: none;
  }

  input[type='checkbox'] + input {
    display: none;
  }

  input[type='checkbox'] + span {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    display: inline-block;
    flex-shrink: 0;
  }

  input[type='checkbox'] + span::before {
    content: '';
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    display: inline-table;
    border: 1px solid ${palette.gray_b0};
    border-radius: 2px;
    box-sizing: border-box;
    background-color: white;
    cursor: pointer;
  }

  input[type='checkbox']:checked + span::before {
    content: ' ';
    width: 18px;
    height: 18px;
    display: inline-table;
    background-color: ${palette.dark_cyan};
    border: 0;
    border-radius: 2px;
    position: absolute;
    background-image: url('/static/svg/common/checkbox/checkbox_mark.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps {
  value?: string[];
  onChange: (_selected: string[]) => void;
  options?: string[];
}

/**
 * 체크 박스 컴포넌트
 * @param value 체크된 값들
 * @param onChange 체크 이벤트 리스너
 * @param options 체크 박스를 보여줄 목록
 * @returns Checkbox Component
 */
export default function CheckboxGroup({ value = [], onChange, options = [] }: IProps) {
  const onChangeChecked = useCallback(
    (option: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      e.target.checked
        ? onChange([...value!, option])
        : onChange(value.filter((item) => item !== option)),
    [onChange, value]
  );

  return (
    <Container>
      {options.map((option) => (
        <label className="checkbox-label" key={option}>
          <input
            type="checkbox"
            checked={value?.includes(option)}
            onChange={onChangeChecked(option)}
          />
          <span />
          {option}
        </label>
      ))}
    </Container>
  );
}
