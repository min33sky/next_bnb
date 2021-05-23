import Data from 'lib/data';
import { isEmpty } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { StoredRoomType } from 'typings/room';

/**
 * 숙소 등록 API
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const {
        largeBuildingType,
        buildingType,
        roomType,
        isSetUpForGuest,
        maximumGuestCount,
        bedroomCount,
        bedCount,
        bedList,
        publicBedList,
        bathroomCount,
        bathroomType,
        latitude,
        longitude,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        amentities,
        conveniences,
        photos,
        description,
        title,
        price,
        startDate,
        endDate,
        hostId,
      } = req.body;
      if (
        !largeBuildingType ||
        !buildingType ||
        !roomType ||
        isSetUpForGuest === null ||
        !maximumGuestCount ||
        !bedroomCount ||
        !bedCount ||
        !bedList ||
        !publicBedList ||
        !bathroomCount ||
        bathroomType === null ||
        !latitude ||
        !longitude ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        (detailAddress !== '' && !detailAddress) ||
        !postcode ||
        !amentities ||
        !conveniences ||
        !photos ||
        !description ||
        !title ||
        !price ||
        !startDate ||
        !endDate ||
        !hostId
      ) {
        return res.status(400).send('필수 값이 없습니다.');
      }

      const rooms = Data.room.getList();

      // ? DB에 숙소 리스트가 비어 있을 때 (처음 등록할 때)
      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.room.write([newRoom]);
        return res.status(201).end();
      }

      // 등록할 숙소 데이터 생성
      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Data.room.write([...rooms, newRoom]);
      return res.status(201).end();
    } catch (error) {
      console.log(error);
      return res.send(error.message);
    }
  }
  return res.status(405).end();
};
