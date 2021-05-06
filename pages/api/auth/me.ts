import jwt from 'jsonwebtoken';
import Data from 'lib/data';
import { NextApiRequest, NextApiResponse } from 'next';
import { StoredUserType } from 'typings/user';

/**
 * 현재 사용자 정보 알아내기
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // 쿠키를 요청 헤더에서 가져온다.
      const accessToken = req.headers.cookie;

      if (!accessToken) {
        return res.status(400).send('access_token does not exist');
      }

      // 토큰을 복호화
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);

      const user = Data.user.find({ id: Number(userId) });

      if (!user) {
        return res.status(404).send('the user does not exist');
      }

      // 패스워드를 제거해서 클라이언트에 전송
      const userWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = user;
      delete userWithoutPassword.password;
      return res.status(200).send(userWithoutPassword);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  return res.status(405).end();
};
