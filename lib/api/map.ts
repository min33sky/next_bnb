import fetch from '.';

type GetLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

/**
 * 현재 위치 정보 가져오기
 * @param latitude  위도
 * @param longitude 경도
 */
export const geoLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  fetch.get<GetLocationInfoAPIResponse>(
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`
  );

/**
 * 장소 검색 API 호출
 * @param keyword 장소 키워드
 * @returns 장소 목록
 */
export const searchPlacesAPI = (keyword: string) =>
  fetch.get<{ description: string; placeId: string }[]>(`/api/maps/places?keyword=${keyword}`);

/**
 * 장소 정보 가져오기 API
 * @param placeId 장소 ID
 * @returns
 */
export const getPlaceAPI = (placeId: string) =>
  fetch.get<{ location: string; latitude: number; longitude: number }>(
    `/api/maps/places/${placeId}`
  );
