import styled from 'styled-components';
import palette from 'styles/palette';

export const Container = styled.form`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;

    :hover {
      color: ${palette.orange};
    }
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;

  svg {
    position: absolute;
    right: 11px;
    top: 16px;
  }

  /* 패스워드 인풋에서 패스워드 보이기 여부 */
  &.sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

export const SelectorsWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;

  /* 월 */
  & > :first-child {
    margin-right: 16px;
    flex-grow: 1;
  }

  /* 일 */
  & > :nth-child(2) {
    margin-right: 16px;
    width: 25%;
  }

  /* 년도 */
  & > :last-child {
    width: 33.3%;
  }
`;
