import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/db';
import User from "@/interfaces/User";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码是必填项' });
      }

      const user = await client.hgetall(username) as User;

      if (user) {
          console.log('用户名已存在')
          return res.status(409).json({ message: '用户名已存在' });
      }

      const newUser = {
            username: username,
            password: password,
            engage_fund: [],
            launch_fund: []
        };

      const result = await client.hmset(username, newUser);
      if (result) {
          return res.status(200).json({ message: 'register successful' });
      }

      return res.status(500).json({ message: '注册失败' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}