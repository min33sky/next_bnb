import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { bedroomCountList } from '../../../lib/staticData';
import { getNumber } from '../../../lib/utils';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import Counter from '../../Common/Counter';
import Selector from '../../Common/Selector';
import RegisterRoomBedList from './RegisterRoomBedList';
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

  h4 {
    font-size: 24px;
    margin-bottom: 6px;
  }

  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
    max-width: 400px;
    word-break: keep-all; //? 줄 바꿈을 할 때 단어를 중간에 끊지 않는다.
  }

  .register-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }

  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }

  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    max-width: 400px;
    word-break: keep-all;
  }

  .register-room-bed-type-list-wrapper {
    width: 548px;
  }
`;

//* ------------------------------------------------------------------------------------- //

/**
 * 숙소 등록하기 [2단계: 침실 등록]
 */
export default function RegisterRoomBedrooms() {
  const maximumGuestCount = useSelector(
    (state) => state.registerRoom.maximumGuestCount
  );
  const bedRoomCount = useSelector((state) => state.registerRoom.bedroomCount);
  const bedCount = useSelector((state) => state.registerRoom.bedCount);

  const dispatch = useDispatch();

  /**
   * 최대 숙박 인원 변경 시
   * @param value 최대 인원 수
   */
  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };

  /**
   * 침실 개수 변경 시
   */
  const onChangeBedroomCount = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0)
    );
  };

  /**
   * 침대 개수 변경 시
   * @param value 침대 개수
   */
  const onChangeBedCount = (value: number) => {
    dispatch(registerRoomActions.setBedCount(value));
  };

  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className="room-register-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요.
      </p>

      <div className="register-room-maximum-guest-count-wrapper">
        <Counter
          label="최대 숙박 인원"
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>

      <div className="register-room-bedroom-count-wrapper">
        <Selector
          type="register"
          value={`침실 ${bedRoomCount}개`}
          onChange={onChangeBedroomCount}
          label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
          options={bedroomCountList}
          isValid={!!bedRoomCount} // 침실 개수가 0개면 무효
        />
      </div>

      <div className="register-room-bed-count-wrapper">
        <Counter label="침대" value={bedCount} onChange={onChangeBedCount} />
      </div>

      <h4>침대 유형</h4>
      <p className="register-room-bed-type-info">
        각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지
        게스트가 잘 파악할 수 있습니다.
      </p>
      <RegisterRoomBedList />

      <RegisterRoomFooter
        prevHref="/room/register/building"
        nextHref="/room/register/bathroom"
        isValid={!!bedRoomCount}
      />
    </Container>
  );
}
