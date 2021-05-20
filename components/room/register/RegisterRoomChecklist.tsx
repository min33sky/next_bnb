import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RegisterRoomCheckStep from './RegisterRoomCheckStep';
import RegisterRoomFooter from './RegisterRoomFooter';
import RegisterRoomSubmitFooter from './RegisterRoomSubmitFooter';

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;

  .register-room-checklist-info {
    margin-bottom: 39px;
  }

  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

/**
 * 숙소 체크 리스트
 */
export default function RegisterRoomChecklist() {
  const registerRoom = useSelector((state) => state.registerRoom);

  /**
   * 숙소 유형 활성화 유무 [1단계]
   * : 모든 항목이 입력되어 있어야 true
   */
  const isBuildingTypeActived = useMemo(() => {
    const { largeBuildingType, buildingType, roomType, isSetUpForGuest } = registerRoom;
    if (!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest) return false;

    return true;
  }, [registerRoom]);

  /**
   * 숙소 종류 활성화 유무 [2단계]
   * : 1단계가 true인지 확인하자
   */
  const isRoomTypeActived = useMemo(() => {
    const { maximumGuestCount, bedCount, bedroomCount } = registerRoom;

    if (!isBuildingTypeActived || !maximumGuestCount || !bedroomCount || !bedCount) return false;

    return true;
  }, [isBuildingTypeActived, registerRoom]);

  /**
   * 욕실 항목 활성화 유무 [3단계]
   */
  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || bathroomType === null) return false;

    return true;
  }, [isRoomTypeActived, registerRoom]);

  /**
   * 위치 활성화 유무 [4단계]
   */
  const isLocationActived = useMemo(() => {
    const { latitude, longitude, country, city, district, streetAddress, postcode } = registerRoom;

    if (
      !isBathroomActived ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    )
      return false;

    return true;
  }, [isBathroomActived, registerRoom]);

  /**
   * 편의 시설 활성화 유무 [5단계]
   */
  const isAmentitiesActived = useMemo(() => {
    const { amentities } = registerRoom;

    if (amentities.length === 0) {
      // ? 편의 시설은 선택 안해도 유효하지만 필요하다면 여기에 작성
    }

    if (isEmpty(amentities)) {
      // ? 마찬가지
    }

    if (!isLocationActived) return false;

    return true;
  }, [isLocationActived, registerRoom]);

  /**
   * 공용공간 활성화 유무 [6단계]
   */
  const isConveniencesActived = useMemo(() => {
    if (!isAmentitiesActived) return false;
    return true;
  }, [isAmentitiesActived]);

  /**
   * 사진 항목이 다 채워져있는지 유무 [7단계]
   */
  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConveniencesActived || !isEmpty(photos)) return false;
    return true;
  }, [isConveniencesActived, registerRoom]);

  /**
   * 숙소 설명이 다 채워져있는지 유무 [8단계]
   */
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActived || !description) return false;
    return true;
  }, [isPhotoActived, registerRoom]);

  /**
   * 숙소 제목이 다 채우져 있는지 유무 [9단계]
   */
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) return false;
    return true;
  }, [isDescriptionActived, registerRoom]);

  /**
   * 숙소 금액이 채워져 있는지 유무 [10단계]
   */
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActived || !price) return false;
    return true;
  }, [isTitleActived, registerRoom]);

  /**
   * 예약 날짜가 채워져 있는지 유무 [11단계]
   */
  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActived || !startDate || !endDate) return false;
    return true;
  }, [isPriceActived, registerRoom]);

  /**
   * 현재 진행중인 단계를 알려주는 함수
   */
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) {
      return 'building';
    }
    if (!isRoomTypeActived) {
      return 'bedrooms';
    }
    if (!isBathroomActived) {
      return 'bathroom';
    }
    if (!isLocationActived) {
      return 'location';
    }
    if (!isAmentitiesActived) {
      return 'amentities';
    }
    if (!isConveniencesActived) {
      return 'conveniences';
    }
    if (!isPhotoActived) {
      return 'photo';
    }
    if (!isDescriptionActived) {
      return 'description';
    }
    if (!isTitleActived) {
      return 'title';
    }
    if (!isPriceActived) {
      return 'price';
    }
    if (!isDateActived) {
      return 'date';
    }
    return '';
  }, [
    isAmentitiesActived,
    isBathroomActived,
    isBuildingTypeActived,
    isConveniencesActived,
    isDateActived,
    isDescriptionActived,
    isPriceActived,
    isRoomTypeActived,
    isLocationActived,
    isTitleActived,
    isPhotoActived,
  ]);

  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 수 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="숙소 유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === 'building'}
        />
        <RegisterRoomCheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === 'bedrooms'}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === 'bathroom'}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === 'location'}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amentities"
          disabled={!isAmentitiesActived}
          inProgress={stepInProgress === 'amentities'}
        />
        <RegisterRoomCheckStep
          step="공용 공간"
          href="/room/register/conveniences"
          disabled={!isConveniencesActived}
          inProgress={stepInProgress === 'conveniences'}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === 'photo'}
        />
        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === 'description'}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActived}
          inProgress={stepInProgress === 'title'}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/price"
          disabled={!isPriceActived}
          inProgress={stepInProgress === 'price'}
        />
        <RegisterRoomCheckStep
          step="예약 날짜"
          href="/room/register/date"
          disabled={!isDateActived}
          inProgress={stepInProgress === 'date'}
        />
      </ul>

      {isDateActived && <RegisterRoomSubmitFooter />}

      {!isDateActived && (
        <RegisterRoomFooter
          prevHref="/room/register/date"
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
}
