import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { amentityList } from '../../../lib/staticData';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import CheckboxGroup from '../../Common/CheckboxGroup';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 102px 30px 100px;
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

  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

/**
 * 숙소 등록 [5단계: 편의 시설 등록]
 */
export default function RegisterRoomAmentities() {
  const dispatch = useDispatch();

  const amentities = useSelector((state) => state.registerRoom.amentities);

  const onChangeAmentities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };

  return (
    <Container>
      <h2>어떤 편의 시설을 제공하시나요?</h2>
      <h3>5단계</h3>
      <p className="register-room-step-info">
        일반적으로 게스트가 기대하는 편의 시설 목록입니다. 숙소를 등록한 후
        언제든 편의 시설을 추가할 수 있어요.
      </p>

      <div className="register-room-amentities-checkbox-group-wrapper">
        <CheckboxGroup
          value={amentities}
          onChange={onChangeAmentities}
          options={amentityList}
        />
      </div>

      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/conveniences"
      />
    </Container>
  );
}
