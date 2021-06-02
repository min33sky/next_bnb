import RoomMain from 'components/Room/Main/RoomMain';
import { getRoomListAPI } from 'lib/api/room';
import { NextPage } from 'next';
import { roomActions } from 'store/room';

/**
 * /room
 * @returns
 */
const index: NextPage = () => {
  return <RoomMain />;
};

index.getInitialProps = async ({ store, query }) => {
  console.log('query:: ', query);

  const {
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    infantsCount,
    latitude,
    longitude,
    limit,
    page = '1',
  } = query;

  try {
    const { data } = await getRoomListAPI({
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      infantsCount,
      latitude,
      longitude,
      limit: limit || '20',
      page: page || '1',
      // ? 한글은 encode 처리해라
      location: query.location ? encodeURI(query.location as string) : undefined,
    });
    store.dispatch(roomActions.setRooms(data));
  } catch (error) {
    console.error(error);
  }

  return {};
};

export default index;
