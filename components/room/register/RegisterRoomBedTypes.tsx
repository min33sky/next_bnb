import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { bedTypes } from '../../../lib/staticData';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import { BedType } from '../../../typings/room';
import Button from '../../common/Button';
import Counter from '../../common/Counter';
import Selector from '../../common/Selector';

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }

  /* 셀렉터 래퍼 */
  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }

  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
    margin-bottom: 18px;
  }

  .register-room-bed-type-counter {
    width: 250px;
    margin-bottom: 18px;
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps {
  // ? id: 침실 번호, beds: 해당 침실에 어떤 타입의 침대들이 있는지
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

/**
 * 침실의 침대 타입 설정 관련
 * @param bedroom 침실
 */
export default function RegisterRoomBedTypes({ bedroom }: IProps) {
  //* 선택된 침대 옵션의 초기값 (스토어에 저장된 값)
  const initialBedOptions = bedroom.beds.map((bed) => bed.type);

  //* 침대 Selector가 보여지는지 유무
  const [opened, setOpened] = useState(false);

  //* 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(
    initialBedOptions
  );

  const dispatch = useDispatch();

  /**
   * 침실의 침대 개수 총합
   */
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  /**
   * 남은 침대 옵션들
   * - 이미 선택된 값은 제외해서 중복 선택을 막는다.
   */
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions]);

  console.log('선택된 침대 옵션들: ', activedBedOptions);

  /**
   * 침실 유형 열고 닫기
   */
  const toggleOpened = () => setOpened(!opened);

  /**
   * 침실의 침대 개수를 변경 시
   * @param value 침대 개수
   * @param type 침대 타입
   */
  const onChangeBedTypeCount = (value: number, type: BedType) =>
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(',');
  }, [bedroom]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedtoom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개 <br />
            {bedsText}
          </p>
        </div>

        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && '완료'}
          {!opened &&
            (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>

      {
        // ? 셀렉터에서 defaultValue랑 value 같이 쓰면 경고가 뜸
        opened && (
          <div className="register-room-bed-type-selector-wrapper">
            {activedBedOptions.map((type) => (
              <div className="register-room-bed-type-counter" key={type}>
                <Counter
                  key={type}
                  label={type}
                  value={
                    bedroom.beds.find((bed) => bed.type === type)?.count || 0
                  }
                  onChange={(value) => {
                    onChangeBedTypeCount(value, type);
                  }}
                />
              </div>
            ))}

            <Selector
              type="register"
              value="다른 침대 추가"
              disabledOptions={['다른 침대 추가']}
              options={lastBedOptions}
              useValidation={false}
              onChange={(e) =>
                setActivedBedOptions([
                  ...activedBedOptions,
                  e.target.value as BedType,
                ])
              }
            />
          </div>
        )
      }
    </Container>
  );
}
