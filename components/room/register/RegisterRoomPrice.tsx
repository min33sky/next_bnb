import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { makeMoneyString } from '../../../lib/utils';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import Input from '../../common/Input';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 102px 30px 100px;
  width: 445px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

/**
 * 숙소 등록 [10단계: 가격 설정]
 */
export default function RegisterRoomPrice() {
  const price = useSelector((state) => state.registerRoom.price);

  const dispatch = useDispatch();

  /**
   * 금액 변경 시
   * ? 금액 형식일 때만 디스패치
   */
  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // 인풋 값이 비워지면 price를 0으로 변경
    if (!input) {
      dispatch(registerRoomActions.setPrice(0));
    }

    const numberPrice = Number(input.replace(/,/g, ''));
    if (numberPrice) {
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  };

  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      <Input
        label="기본요금"
        value={makeMoneyString(String(price))}
        onChange={onChangePrice}
      />

      <RegisterRoomFooter
        prevHref="/room/register/title"
        nextHref="/room/register/date"
      />
    </Container>
  );
}
