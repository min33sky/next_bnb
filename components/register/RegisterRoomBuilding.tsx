import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { largeBuildingTypeList } from '../../lib/staticData';
import { registerActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import Selector from '../common/Selector';

//* 선택 불가능한 큰 범위 건물 유형
const disabledLargeBuildingTypeOptions = ['하나를 선택해주세요.'];

const Container = styled.div`
  /* padding: 62px 30px 100px; */
  padding: 102px 30px 100px;

  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 50px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 5px;
  }
`;

/**
 * 숙소 건물 등록 컴포넌트
 */
export default function RegisterRoomBuilding() {
  const dispatch = useDispatch();
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );

  //* 큰 범위 건물 유형 변경 시
  const onChangeLargeBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(registerActions.setLargeBuildingType(event.target.value));
  };

  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="하나를 선택해주세요."
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
    </Container>
  );
}
