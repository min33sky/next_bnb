import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 특정 장소의 lagitude, longitude 설정
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { placeId } = req.query;
    if (!placeId) {
      return res.status(400).send('placeId 없습니다.');
    }
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      const { formatted_address: location } = data.results[0];
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        location,
        latitude: lat,
        longitude: lng,
      };

      return res.status(200).send(result);
    } catch (error) {
      console.error(error);
      return res.status(404).end();
    }
  }
  return res.status(405).end();
};
