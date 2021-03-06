import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useValidateMode from 'hooks/useValidateMode';
import palette from 'styles/palette';
import Button from 'components/Common/Button';
import BackArrowIcon from '../../../public/static/svg/register/register_room_footer_back_arrow.svg';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

/**
 * 숙소 등록단계 화면의 푸터
 * @param prevHref 뒤로 가기 URL
 * @param prevHref 다음 URL
 * @param isValid 현재 등록 단계의 유효성 체크
 */
function RegisterRoomFooter({ prevHref, nextHref, isValid = true }: IProps) {
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, [setValidateMode]);

  //* 계속 버튼 클릭 시
  const onClickNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      event.preventDefault();
      setValidateMode(true);
    }
  };

  return (
    <Container>
      <Link href={prevHref || ''}>
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>

      <Link href={nextHref || ''}>
        <a>
          <Button color="dark_cyan" onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
}

export default React.memo(RegisterRoomFooter);
