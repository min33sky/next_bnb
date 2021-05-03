import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import palette from '../../../styles/palette';
import Button from '../../Common/Button';
import NavigationIcon from '../../../public/static/svg/register/navigation.svg';
import Selector from '../../Common/Selector';
import { countryList } from '../../../lib/staticData';
import Input from '../../Common/Input';
import { registerRoomActions } from '../../../store/registerRoom';
import { geoLocationInfoAPI } from '../../../lib/api/map';
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

  .register-room-location-button-wrapper {
    width: 186px;
    margin-bottom: 24px;
  }

  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
`;

/**
 * 숙소 등록 [4단계: 위치 설정]
 */
export default function RegisterRoomLocation() {
  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector(
    (state) => state.registerRoom.streetAddress
  );
  const detailAddress = useSelector(
    (state) => state.registerRoom.detailAddress
  );
  const postcode = useSelector((state) => state.registerRoom.postcode);

  //* 현재 주소 불러오기 로딩
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value));
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };

  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };

  const onChangeDetailAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setDetailAddress(event.target.value));
  };

  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(event.target.value));
  };

  /**
   * 현재 위치 불러오기에 성공했을 때
   * @param coords 위치 정보
   */
  const onSuccessGetLocation = async ({ coords }: { coords: any }) => {
    try {
      const { data: currentLocation } = await geoLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log(currentLocation);
      dispatch(registerRoomActions.setCountry(currentLocation.country));
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(
        registerRoomActions.setStreetAddress(currentLocation.streetAddress)
      );
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  /**
   * 현재 위치 불러오기
   */
  const onClickGetCurrentLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      // ? 위치 검색에 실패 했을 때
      console.log(e);
    });
  };

  return (
    <Container>
      <h2>숙소의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>

      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? '불러오는 중...' : '현재 위치 사용'}
        </Button>
      </div>

      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          value={country}
          disabledOptions={['국가/지역 선택']}
          onChange={onChangeCountry}
        />
      </div>

      <div className="register-room-location-city-district">
        <Input label="시/도" value={city} onChange={onChangeCity} />
        <Input label="시/군/구" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="도로명주소"
          value={streetAddress}
          onChange={onChangeStreetAddress}
        />
      </div>
      <div className="register-room-lacation-detail-address">
        <Input
          label="동호수(선택 사항)"
          useValidation={false}
          value={detailAddress}
          onChange={onChangeDetailAddress}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" value={postcode} onChange={onChangePostcode} />
      </div>

      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
}
