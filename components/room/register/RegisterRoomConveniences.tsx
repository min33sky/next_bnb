import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { convinienceList } from '../../../lib/staticData';
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

//* ------------------------------------------------------------------------------------- //

/**
 * 숙소 등록 [6단계: 편의 공간]
 */
export default function RegisterRoomConveniences() {
  const dispatch = useDispatch();

  const conveniences = useSelector((state) => state.registerRoom.conveniences);

  const onChangeConveniences = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected));
  };

  return (
    <Container>
      <h2>게스트가 어떤 공간을 사용할 수 있나요?</h2>
      <h3>6단계</h3>
      <p className="register-room-step-info">
        등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.
      </p>

      <div className="register-room-conveniences-checkbox-group-wrapper">
        <CheckboxGroup
          value={conveniences}
          onChange={onChangeConveniences}
          options={convinienceList}
        />
      </div>

      <RegisterRoomFooter
        prevHref="/room/register/amentities"
        nextHref="/room/register/photo"
      />
    </Container>
  );
}
