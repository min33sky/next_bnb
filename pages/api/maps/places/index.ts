import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 구글 장소 검색 API
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).send('No Keyword');
    }

    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
        }&language=ko&input=${encodeURI(keyword as string)}`
      );
      console.log('장소 검색: ', data);

      //* description과 place_id만 추출해서 전달
      const results = data.predictions.map((prediction: any) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));

      res.status(200).send(results);
    } catch (error) {
      console.error(error);
      res.status(404).end();
    }
  }

  return res.status(405).end();
};
