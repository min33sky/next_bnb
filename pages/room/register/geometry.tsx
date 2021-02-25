import React from 'react';
import dynamic from 'next/dynamic';

/**
 * ? dynamic을 사용하여 서버 사이드 랜더링을 하지 않고 불러온다.
 * ? dynamic을 사용하지 않고 import하면 window is undefined 에러 발생
 */
const RegisterRoomGeometry = dynamic(
  import('../../../components/room/register/RegisterRoomGeometry'),
  { ssr: false }
);

/**
 * 구글 맵을 이용해 정확한 위치 설정 페이지
 * /room/register/geometry
 */
export default function geometry() {
  return <RegisterRoomGeometry />;
}
