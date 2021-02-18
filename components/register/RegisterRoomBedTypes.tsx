import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { bedTypes } from '../../lib/staticData';
import palette from '../../styles/palette';
import { BedType } from '../../types/room';
import Button from '../common/Button';
import Selector from '../common/Selector';

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

  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }
`;

//* ------------------------------------------------------------------------------------- //

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

/**
 * 침실의 침대 타입 설정 관련
 * @param bedroom 침실
 */
export default function RegisterRoomBedTypes({ bedroom }: IProps) {
  const [opened, setOpened] = useState(false);
  // 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>([]);

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
   */
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  console.log('선택된 침대 옵션들: ', activedBedOptions);

  /**
   * 침실 유형 열고 닫기
   */
  const toggleOpened = () => setOpened(!opened);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedtoom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개
          </p>
        </div>
        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && '완료'}
          {!opened &&
            (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>

      {
        // ? defaultValue랑 value 같이 쓰면 경고가 뜸
        opened && (
          <div className="register-room-bed-type-selector-wrapper">
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
