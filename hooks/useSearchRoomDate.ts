import { searchRoomActions } from 'store/searchRoom';
import { useDispatch, useSelector } from 'react-redux';

/**
 * 숙소 검색 예약 날짜
 */
const useSearchRoomDate = () => {
  const dispatch = useDispatch();
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  /**
   * 체크인 날짜 변경 Dispatch
   * @param date
   */
  const setCheckInDateDispatch = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setStartDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setStartDate(null));
    }
  };

  /**
   * 체크아웃 날짜 변경 Dispatch
   * @param date
   */
  const setCheckOutDateDispatch = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setEndDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setEndDate(null));
    }
  };

  return {
    checkInDate: checkInDate ? new Date(checkInDate) : null,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
    setCheckInDateDispatch,
    setCheckOutDateDispatch,
  };
};

export default useSearchRoomDate;
