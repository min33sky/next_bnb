import Button from 'components/Common/Button';
import Link from 'next/link';
import React from 'react';
import SearchIcon from '../../../public/static/svg/search/white_search.svg';

/**
 * 숙소 검색 버튼
 * @returns
 */
export default function SearchRoomButton() {
  return (
    <Link href="/room">
      <a>
        <Button styleType="register" icon={<SearchIcon />} color="amaranth" width="89px">
          검색
        </Button>
      </a>
    </Link>
  );
}
