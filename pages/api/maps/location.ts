import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 위도, 경고값으로 주소 불러오기
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).send('위치 정보가 없습니다.');
    }

    try {
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const { data } = await axios.get(URL);
      console.log(data);
      const addressComponent = data.results[0].address_components;
      console.log('addressCompoent', addressComponent);
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        latitude: lat,
        longitude: lng,
        country: addressComponent[5].long_name,
        city: addressComponent[3].long_name,
        district: addressComponent[2].long_name,
        streetAddress: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
        postcode: addressComponent[6].long_name,
      };

      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).end();
    }
  }

  return res.status(405).end();
};
