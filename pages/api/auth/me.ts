import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        return res.status(400).send('access_token이 없습니다.');
      }

      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);

      const user = Data.user.find({ id: Number(userId) });
      if (!user) {
        return res.status(404).send('해당 유저가 없습니다.');
      }

      const userWithoutPassword: Partial<
        Pick<StoredUserType, 'password'>
      > = user;

      delete userWithoutPassword.password;
      return res.status(200).send(userWithoutPassword);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  return res.status(405).end();
};
