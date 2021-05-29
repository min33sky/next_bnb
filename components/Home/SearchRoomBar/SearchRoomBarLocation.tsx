import useDebounce from 'hooks/useDebounce';
import useClickOutside from 'hooks/useOutsideClick';
import { getPlaceAPI, searchPlacesAPI } from 'lib/api/map';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRoomActions } from 'store/searchRoom';
import styled from 'styled-components';
import palette from 'styles/palette';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }

  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;
    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      outline: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }

  .search-roo-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;

    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

/**
 * 위치 검색
 * @returns 위치 검색
 */
export default function SearchRoomBarLocation() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.searchRoomm.location);
  const [results, setResults] = useState<{ description: string; placeId: string }[]>([]);
  const searchKeyword = useDebounce(location, 150); //! debounce Hook으로 API의 과도한 호출을 막는다

  const { buttonRef, contentRef, isClickedOutside, setIsClickedOutside } =
    useClickOutside<HTMLDivElement & HTMLUListElement>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 위치 변경
   * @param e
   */
  const setChangeLocationDispatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchRoomActions.setLocation(e.target.value));
  };

  /**
   * 위도 변경
   * @param value
   */
  const setLatitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLatitude(value));
  };

  /**
   * 경도 변경
   * @param value
   */
  const setLongitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLongitude(value));
  };

  /**
   * 근처 추천 장소 클릭 시
   */
  const onClickNearPlaces = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch(searchRoomActions.setLocation('근처 추천 장소'));
        setLatitudeDispatch(coords.latitude);
        setLongitudeDispatch(coords.longitude);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  /**
   * 검색된 장소 클릭 시
   * @param placeId 장소 ID
   */
  const onCLickResult = async (placeId: string) => {
    try {
      const { data } = await getPlaceAPI(placeId);
      console.log('placeId, location', placeId, data.location, data);
      dispatch(searchRoomActions.setLocation(data.location));
      setLatitudeDispatch(data.latitude);
      setLongitudeDispatch(data.longitude);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 인원 INPUT 클릭
   */
  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsClickedOutside(true);
  };

  const searchPlaces = useCallback(async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      console.log('#data: ', data);
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  //* 검색어가 변하면 장소를 검색
  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    } else {
      searchPlaces();
    }
  }, [searchPlaces, searchKeyword]);

  return (
    <Container ref={buttonRef} onClick={onClickInput}>
      <div className="search-room-bar-location-texts">
        <p className="search-room-bar-location-label">인원</p>
        <input
          ref={inputRef}
          type="text"
          value={location}
          onChange={setChangeLocationDispatch}
          placeholder="어디로 여행 가세요?"
        />
      </div>
      {/* 추천 장소 팝업 */}
      {isClickedOutside && location !== '근처 추천 장소' && (
        <ul ref={contentRef} className="search-roo-bar-location-results">
          {!location && (
            <li role="presentation" onClick={onClickNearPlaces}>
              근처 추천 장소
            </li>
          )}
          {!isEmpty(results) &&
            results.map((result, index) => (
              <li role="presentation" key={index} onClick={() => onCLickResult(result.placeId)}>
                {result.description}
              </li>
            ))}
          {location && isEmpty(results) && <li>검색 결과가 없습니다.</li>}
        </ul>
      )}
    </Container>
  );
}
