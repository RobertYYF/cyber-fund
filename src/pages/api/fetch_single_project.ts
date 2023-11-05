import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/db';

export default async function fetch_single_project(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    const projectId = req.query.projectId;
    console.log('fetch single project :' + projectId)
      if (typeof projectId === "string") {
          const project = await client.hgetall(projectId);
          if (project) {
              return res.status(200).json({project});
          }

          return res.status(500).json({message: 'fetch_project failed'});
      }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}