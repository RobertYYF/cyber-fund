import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/db';
import User from "@/interfaces/User";

export default async function engage_fund(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('engage_fund尝试')
    const { projectId, username } = req.body;
    // 更新到User中
    const updateRes = await client.rpush(`${username}:engage_fund`, projectId);
    if (updateRes) {
        console.log('Project Id 写入个人成功')
        return res.status(201).json({message: projectId});
    }
    return res.status(500).json({ message: 'engage fund failed' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}