import Counter from 'components/Common/Counter';
import RadioGroup from 'components/Common/RadioGroup';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRoomActions } from 'store/registerRoom';
import styled from 'styled-components';
import palette from 'styles/palette';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;

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

  .register-room-bathroom-counter-wrapper {
    width: 290px;
    margin-bottom: 32px;
  }
`;

/**
 * 숙소 등록 [3단계: 욕실]
 * @returns Component to register bathroom
 */
export default function RegisterBathroom() {
  const dispatch = useDispatch();
  const bathroomCount = useSelector((state) => state.registerRoom.bathroomCount);
  const bathroomType = useSelector((state) => state.registerRoom.bathroomType);

  const onClickCounterChange = useCallback(
    (value: number) => {
      dispatch(registerRoomActions.setBathroomCount(value));
    },
    [dispatch]
  );

  const onClickRadioChange = useCallback(
    (value: 'private' | 'public') => {
      dispatch(registerRoomActions.setBathroomType(value));
    },
    [dispatch]
  );

  return (
    <Container>
      <h2>욕실 수</h2>
      <h3>3단계</h3>
      <p className="register-room-step-info">샤워실 또는 욕조가 없는 경우 0.5개로 간주합니다.</p>
      <div className="register-room-bathroom-counter-wrapper">
        <Counter
          label="욕실"
          increaseNum={0.5}
          value={bathroomCount}
          onChange={onClickCounterChange}
        />
      </div>

      <RadioGroup
        label="게스트가 단독으로 사용하는 욕실인가요?"
        value={bathroomType}
        isValid={!!bathroomType}
        onChange={onClickRadioChange}
        options={[
          { value: 'private', label: '예' },
          { value: 'public', label: '아니오' },
        ]}
      />

      <RegisterRoomFooter
        prevHref="/room/register/bedrooms"
        nextHref="/room/register/location"
        isValid={bathroomCount > 0 && !!bathroomType}
      />
    </Container>
  );
}
