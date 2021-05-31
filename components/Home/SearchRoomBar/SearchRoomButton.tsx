import Button from 'components/Common/Button';
import { makeQueryString } from 'lib/utils';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '../../../public/static/svg/search/white_search.svg';

/**
 * 숙소 검색 버튼
 * @returns
 */
export default function SearchRoomButton() {
  const searchRoom = useSelector((state) => state.searchRoom);

  const roomListHref = makeQueryString('/room', searchRoom);

  return (
    <Link href={roomListHref}>
      <a>
        <Button styleType="register" icon={<SearchIcon />} color="amaranth" width="89px">
          검색
        </Button>
      </a>
    </Link>
  );
}
