import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import useValidateMode from '../../hooks/useValidateMode';
import palette from '../../styles/palette';
import WarningIcon from '../../public/static/svg/common/warning.svg';

/**
 * 일반 셀렉터 스타일
 */
const normalSelectorStyle = css`
  width: 100%; /* width가 100%이므로 width를 설정하고 margin을 줄 Wrapper를 만들어서 사용 */
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
`;

/**
 * 숙소 등록 전용 셀렉터
 */
const RegisterSelectorStyle = css`
  width: 100%;

  label {
    position: relative;
  }

  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }

  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/register_selector_down_arrow.svg');
    background-position: right 14px center;
    background-repeat: no-repeat;
  }
`;

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: 'register' | 'normal';
}

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === 'normal' && normalSelectorStyle}
  ${({ type }) => type === 'register' && RegisterSelectorStyle}

  select {
    ${({ isValid, validateMode }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}

    &:disabled {
      background-image: url('/static/svg/common/selector/disabled_register_selector_down_arrow.svg');
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
      cursor: not-allowed;
    }
  }

  /* 경고 메세지  */
  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }

    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'register' | 'normal';
  disabledOptions?: string[];
}

/**
 * 셀렉터 컴포넌트
 * @param label 셀렉터 이름
 * @param options 선택 가능한 값
 * @param isValid 유효성 체크
 * @param errorMessage 에러 메세지
 * @param useValidation 검증이 필요한 셀렉터 유무
 * @param type 일반 셀렉터 | 등록에 사용되는 셀렉터
 * @param disabledOptions 선택 불가능한 값 (선택 값의 속성명)
 *
 */
function Selector({
  label,
  options = [],
  isValid,
  errorMessage = '옵션을 선택하세요',
  useValidation = true,
  type = 'normal',
  disabledOptions = [],
  ...props // ? ex) onChange, ...
}: IProps) {
  // 스토어에서 검증 모드인지 체크
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      isValid={!!isValid}
      validateMode={useValidateMode && validateMode}
      type={type}
    >
      <label>
        {label && <span>{label}</span>}
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
      </label>

      {/* 경고 내용 랜더링 할 장소 */}
      {useValidation && validateMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
}

export default React.memo(Selector);
