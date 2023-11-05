import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/db';
import User from "@/interfaces/User";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码是必填项' });
    }

    try {
      const user = await client.hgetall(username) as User;
      if (!user || user.password?.toString() !== password.toString()) {
        return res.status(401).json({ message: '用户名或密码不正确' });
      }

      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('登录失败:', error);
      return res.status(500).json({ message: 'Login failed' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}