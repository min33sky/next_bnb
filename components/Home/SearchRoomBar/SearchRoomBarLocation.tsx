import useClickOutside from 'hooks/useOutsideClick';
import React, { useRef } from 'react';
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

  const { buttonRef, contentRef, isClickedOutside, setIsClickedOutside } =
    useClickOutside<HTMLDivElement & HTMLUListElement>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeLoacation = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchRoomActions.setLocation(e.target.value));
  };

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsClickedOutside((prev) => !prev);
  };

  return (
    <Container ref={buttonRef} onClick={onClickInput}>
      <div className="search-room-bar-location-texts">
        <p className="search-room-bar-location-label">인원</p>
        <input
          ref={inputRef}
          type="text"
          value={location}
          onChange={onChangeLoacation}
          placeholder="어디로 여행 가세요?"
        />
      </div>
      {/* 추천 장소 팝업 */}
      {isClickedOutside && (
        <ul ref={contentRef} className="search-roo-bar-location-results">
          <li>근처 추천 장소</li>
        </ul>
      )}
    </Container>
  );
}
