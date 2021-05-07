import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  apartmentBuildingTypeList,
  bnbBuildingTypeList,
  boutiquesHotelBuildingTypeList,
  disabledLargeBuildingTypeOptions,
  houstBuildingTypeList,
  isSetUpForGuestOptions,
  largeBuildingTypeList,
  roomTypeRadioOptions,
  secondaryUnitBuildingTypeList,
  uniqueSpaceBuildingTypeList,
} from 'lib/staticData';
import { registerRoomActions } from 'store/registerRoom';
import palette from 'styles/palette';
import Selector from 'components/Common/Selector';
import RadioGroup from 'components/Common/RadioGroup';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;

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

  /* 셀렉터 래퍼 */
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  /* 숙소 유형 라디오 컴포넌트  */
  .register-room-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }

  /* 게스트 전용 체크 */
  .register-room-is-setup-for-guest-radio {
    margin-bottom: 50px;
  }
`;

//* ------------------------------------------------------------------------------------- //

/**
 * 숙소 건물 등록 (1단계)
 * @returns Component for register for room building type
 */
export default function RegisterRoomBuilding() {
  const dispatch = useDispatch();
  const largeBuildingType = useSelector((state) => state.registerRoom.largeBuildingType);
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const roomType = useSelector((state) => state.registerRoom.roomType);
  const isSetUpForGuest = useSelector((state) => state.registerRoom.isSetUpForGuest);

  //* 큰 범위 건물 유형 변경 시
  const onChangeLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
  };

  //* 상세 건물 유형 변경 시
  const onChangeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(event.target.value));
  };

  //* 숙소 유형 변경 시
  const onChangeRoomType = (value: 'entire' | 'private' | 'public') => {
    dispatch(registerRoomActions.setRoomType(value));
  };

  //* 게스트용 숙소인지 변경 시
  const onChangeIsSetUpForGuest = (value: boolean) => {
    dispatch(registerRoomActions.setIsSetUpForGuest(value));
  };

  /**
   * 선택된 건물 유형 options
   */
  const detailBuildingOptions = useMemo(() => {
    // ? 큰 건물 유형이 선택되었을 때 상세 건물 유형 스토어 상태 업데이트
    switch (largeBuildingType) {
      case '아파트': {
        dispatch(registerRoomActions.setBuildingType(apartmentBuildingTypeList[0]));
        return apartmentBuildingTypeList;
      }

      case '주택': {
        dispatch(registerRoomActions.setBuildingType(houstBuildingTypeList[0]));
        return houstBuildingTypeList;
      }

      case '별채': {
        dispatch(registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0]));
        return secondaryUnitBuildingTypeList;
      }

      case '독특한 숙소': {
        dispatch(registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0]));
        return uniqueSpaceBuildingTypeList;
      }

      case 'B&B': {
        dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      }

      case '부티크호텔': {
        dispatch(registerRoomActions.setBuildingType(boutiquesHotelBuildingTypeList[0]));
        return boutiquesHotelBuildingTypeList;
      }

      default:
        return [];
    }
  }, [largeBuildingType, dispatch]);

  /**
   * 모든 선택 항목이 다 선택되었는지 확인하는 함수
   */
  const isValid = useMemo(() => {
    if (!largeBuildingType || !buildingType || !roomType || isSetUpForGuest === null) {
      return false;
    }
    return true;
  }, [largeBuildingType, buildingType, roomType, isSetUpForGuest]);

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
          isValid={!!largeBuildingType}
        />
      </div>

      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || undefined}
          onChange={onChangeBuildingType}
          disabled={!largeBuildingType}
          label="건물 유형을 선택하세요."
          options={detailBuildingOptions}
          isValid={!!buildingType}
        />
      </div>

      {buildingType && (
        <>
          <div className="register-room-room-type-radio">
            <RadioGroup
              label="게스트가 묵게 될 숙소 유형을 골라주세요"
              value={roomType}
              onChange={onChangeRoomType}
              options={roomTypeRadioOptions}
              isValid={!!roomType}
            />
          </div>

          <div className="register-room-is-setup-for-guest-radio">
            <RadioGroup
              label="게스트만 사용하도록 만들어진 숙소인가요?"
              value={isSetUpForGuest}
              onChange={onChangeIsSetUpForGuest}
              options={isSetUpForGuestOptions}
              isValid={isSetUpForGuest !== null}
            />
          </div>
        </>
      )}

      <RegisterRoomFooter isValid={isValid} prevHref="/" nextHref="/room/register/bedrooms" />
    </Container>
  );
}
