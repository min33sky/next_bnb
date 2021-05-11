import React, { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from 'styles/palette';
import { registerRoomActions } from 'store/registerRoom';
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

  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  /* 지도 위성 표시 제거 */
  .gmnoprint .gm-style-mtc {
    display: none;
  }

  /* 로드뷰 아이콘 제거 */
  .gm-svpc {
    display: none;
  }

  /* 풀스크린 제거 */
  .gm-fullscreen-control {
    display: none;
  }
`;

/**
 * 구글 맵 script 불러오기
 * https://developers.google.com/maps/documentation/javascript/overview
 * ? script를 불러오기 전까지 google api를 사용할 수 없기 때문에 Promise를 사용하여 대기
 * ? 지도를 불렀을 때 window.initMap 함수가 호출되도록 설정
 */
const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

//* ------------------------------------------------------------------------------------- //

/**
 * 숙소 등록 [4단계: 구글맵을 통해 정확한 위치 설정]
 */
export default function RegisterRoomGeometry() {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  /**
   * google map script를 로드하는 함수
   */
  const loadMap = async () => {
    await loadMapScript();
  };

  /**
   * 지도를 생성하는 함수
   */
  window.initMap = () => {
    //* 지도 불러오기 (지도를 보여줄 DOM이 존재할 때)
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      });

      // 빨간색 마커
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      });

      // 지도 중앙에 마커를 설정하는 이벤트 (잦은 호출을 막기위해 throttle 사용)
      map.addListener(
        'center_changed',
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();
          marker.setPosition({ lat: centerLat, lng: centerLng });
          dispatch(registerRoomActions.setLatitude(centerLat));
          dispatch(registerRoomActions.setLongitude(centerLng));
        }, 150)
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <>
      <Container>
        <h2>핀이 놓인 위치가 정확한가요?</h2>
        <h3>4단계</h3>
        <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
        <div className="register-room-geometry-map-wrapper">
          <div ref={mapRef} id="map" />
        </div>

        <RegisterRoomFooter
          prevHref="/room/register/location"
          nextHref="/room/register/amentities"
        />
      </Container>
    </>
  );
}
