import DatePicker from 'components/Common/DatePicker';
import useSearchRoomDate from 'hooks/useSearchRoomDate';
import React from 'react';
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

  .search-room-bar-date-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
    position: absolute;
    z-index: 1;
    left: 20px;
    top: 16px;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 20px 0 0 20px;
    border-radius: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }

  > div {
    width: 100%;
    height: 100%;
    .react-datepicker-wrapper {
      width: 100%;
      height: 100%;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    }
    .react-datepicker {
      display: flex;
    }
  }
`;

export default function SearchRoomCheckOutDate() {
  const { checkInDate, checkOutDate, setCheckOutDateDispatch } = useSearchRoomDate();

  const onChangeCheckOutDate = (date: Date | null) => setCheckOutDateDispatch(date);

  return (
    <Container>
      <p className="search-room-bar-date-label">체크아웃</p>
      <DatePicker
        selected={checkOutDate}
        monthsShown={2}
        onChange={onChangeCheckOutDate}
        selectsEnd
        popperPlacement="bottom-end"
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={checkInDate}
        placeholderText="날짜 추가"
      />
    </Container>
  );
}
