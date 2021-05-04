import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from 'styles/palette';

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }

  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;

    ::placeholder {
      color: ${palette.gray_76};
    }

    & :focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }

  /* 검증에 실패했을 때 처리 */
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
      }

      & :focus {
        border-color: ${palette.orange};
      }
    `}

  /* 유효할 때 */
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

const InputIconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 11px;
  height: 46px;
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${palette.tawny};
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: JSX.Element;
  isValid?: boolean;
  useValidation?: boolean; // 검증을 할 컴포넌트인지 선택
  errorMessage?: string;
}

/**
 * Input Component
 * @param param0
 * @returns Input Component
 */
function Input({
  label,
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}: IProps) {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}

      <InputIconWrapper>{icon}</InputIconWrapper>

      {useValidation && validateMode && !isValid && errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
}

export default React.memo(Input);
