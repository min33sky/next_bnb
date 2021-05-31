import Counter from 'components/Common/Counter';
import useClickOutside from 'hooks/useOutsideClick';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRoomActions } from 'store/searchRoom';
import styled from 'styled-components';
import palette from 'styles/palette';
import SearchRoomButton from './SearchRoomButton';

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

  > div {
    /* width: 100%; */
    height: 100%;
  }

  .search-room-bar-guests-texts {
    position: absolute;
    width: calc(100% - 114px);
    top: 16px;
    left: 20px;
  }

  .search-room-bar-guests-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .search-room-bar-guests-popup {
    position: absolute;
    width: 394px;
    height: 220px; //! 임시 값
    top: 78px;
    right: 0;
    padding: 16px 32px;
    background-color: white;
    border-radius: 32px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    cursor: default;
  }

  .search-room-bar-guests-counter-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }

  .search-room-bar-guests-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-room-bar-button-wrapper {
    position: absolute;
    right: 0;
    top: 12px;
    right: 12px;
  }
`;

/**
 * 인원 검색
 * @returns
 */
export default function SearchRoomGuests() {
  const dispatch = useDispatch();
  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);

  const { buttonRef, contentRef, isClickedOutside, setIsClickedOutside } =
    useClickOutside<HTMLDivElement>();

  // 팝업창 ON
  const onClickSearch = () => {
    setIsClickedOutside(true);
  };

  const setAdultCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setAdultCount(value));
  };

  const setChildrenCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setChildrenCount(value));
  };

  const setInfantsCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setInfantsCount(value));
  };

  return (
    <Container ref={buttonRef} onClick={onClickSearch}>
      <div className="search-room-bar-guests-texts">
        <p className="search-room-bar-guests-label">인원</p>
        <p className="search-room-bar-guests-text">성인 0명</p>
      </div>

      <div className="search-room-bar-button-wrapper">
        <SearchRoomButton />
      </div>

      {/* 팝업 자리 */}
      {isClickedOutside && (
        <div ref={contentRef} className="search-room-bar-guests-popup">
          <div className="search-room-bar-guests-counter-wrapper">
            <Counter
              label="성인"
              description="만 13세 이상"
              minValue={1}
              value={adultCount}
              onChange={(count) => setAdultCountDispatch(count)}
            />
          </div>
          <div className="search-room-bar-guests-counter-wrapper">
            <Counter
              label="어린이"
              description="2-12세"
              minValue={1}
              value={childrenCount}
              onChange={(count) => setChildrenCountDispatch(count)}
            />
          </div>
          <div className="search-room-bar-guests-counter-wrapper">
            <Counter
              label="유아"
              description="2세 미만"
              minValue={1}
              value={infantsCount}
              onChange={(count) => setInfantsCountDispatch(count)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
