import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import palette from 'styles/palette';
import Button from 'components/Common/Button';
import { registerRoomAPI } from 'lib/api/room';
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

/**
 * 최종 숙소 등록 푸터
 * @returns Footer Component to register room
 */
export default function RegisterRoomSubmitFooter() {
  const router = useRouter();
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  /**
   * 숙소 등록 핸들러
   */
  const onClickRegisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };
    try {
      await registerRoomAPI(registerRoomBody);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Link href="/room/register/date">
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button onClick={onClickRegisterRoom} color="bittersweet" width="102px" styleType="register">
        등록하기
      </Button>
    </Container>
  );
}
