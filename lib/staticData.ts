/**
 *? 정적 데이터를 모아두는 파일
 */

//* 1월부터 12월까지
export const monthList = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

//* 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(`${i + 1}일`));

//* 올해부터 100년전까지
export const yearList = Array.from(Array(121), (_, i) =>
  String(`${new Date().getFullYear() - i}년`)
);

//* 숙소 큰 범위의 건물 유형
export const largeBuildingTypeList = [
  '아파트',
  '주택',
  '별채',
  '독특한 숙소',
  'B&B',
  '부티크호텔',
];
