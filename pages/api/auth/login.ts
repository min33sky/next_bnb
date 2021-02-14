import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

/**
 * 로그인 API
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      // 이메일과 패스워드가 모두 있는지 확인
      if (!email || !password) {
        return res.status(400).send('필수 데이터가 없습니다.');
      }

      // 해당 유저가 존재하는 지 확인
      const user = Data.user.find({ email });
      if (!user) {
        return res.status(404).send('해당 유저가 존재하지 않습니다.');
      }

      // 비밀번호 일치 확인
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        return res.status(403).send('비밀번호가 일치하지 않습니다.');
      }

      // 비밀번호를 제거하고 인증 토큰을 생성 후 쿠키에 담아서 전송하기
      const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);

      res.setHeader(
        'Set-Cookie',
        `access_token=${token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3 // 3일
        ).toISOString()}; httponly`
      );

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
