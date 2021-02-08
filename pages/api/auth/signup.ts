import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // ? 확정 아님
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      return res.status(400).send('필수 데이터가 없습니다.');
    }

    // 기존 사용자 찾기
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.status(409).send('이미 가입된 이메일입니다.');
    }

    // 패스워드 해시화하기
    const hashedPassword = bcrypt.hashSync(password, 8);

    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    // 신규 유저 객체 생성
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    // 유저를 DB에 저장
    Data.user.write([...users, newUser]);

    // JWT 생성
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

    console.log('토큰 : ', token);

    // 헤더에 Set-Cookie 설정
    // res.setHeader(
    //   'Set-Cookie',
    //   `access_token=${token}; path=/; expires=${new Date(
    //     Date.now() + 60 * 60 * 24 * 1000 * 3 // 3일
    //   )}; httponly`
    // );

    return res.end();
  }

  return res.status(405).end();
};
