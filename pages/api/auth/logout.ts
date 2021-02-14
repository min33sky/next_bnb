import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 로그아웃 API
 * 1. 쿠키의 access_token 제거 (쿠기가 httponly 속성이므로 javascript로 제거 불가능함)
 * 2. 리덕스 스토어의 유저 정보 제거 및 isLogged를 false로 변경
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // 로그아웃
    if (req.method === 'DELETE') {
      // ? 쿠키의 만료일을 변경해서 쿠키를 삭제시킨다.
      res.setHeader(
        'Set-Cookie',
        'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
      );
      // ? statusCode 204: No Content
      return res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }

  return res.status(405).end();
};
