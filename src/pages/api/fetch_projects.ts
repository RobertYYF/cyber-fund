import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/db';
import User from "@/interfaces/User";
import * as repl from "repl";

async function fetchFundListByType(type: string, username: string | string[] | undefined, res: NextApiResponse) {
    let typeStr = '';
    if (type === '1') {
        typeStr = 'launch_fund';
    } else if (type === '2') {
        typeStr = 'engage_fund';
    }

    // 从 Redis 中获取所有项目的 ID
    const projectIds = await client.lrange(`${username}:${typeStr}`, 0, -1);
    if (projectIds) {
        console.log('获取source: ', username, typeStr)
        console.log('获取projects数量', projectIds.length)

        // 通过项目 ID 获取项目数据
        const projects: string[] = [];

        if (projectIds.length == 0) {
            return;
        }

        const multi = client.multi();

        projectIds.forEach((projectId) => {
            multi.hgetall(`${projectId}`);
        });

        const replies: string[] = await multi.exec();
        if (replies) {
            // 处理每个项目的数据
            replies.forEach((reply) => {
                if (reply) {
                    projects.push(reply);
                }
            });

            console.log('获取project成功' + projects.length)
            res.status(200).json({projects});
        }
    }
}

export default async function fetch_projects(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 如果是用户自己请求的，返回对应的ProjectList
    const isSelf: string | string[] | undefined = req.query.isSelf;
    const type: string | string[] | undefined = req.query.type;
    const username: string | string[] | undefined = req.query.username;

    console.log('Fetch Projects, isSelf ', isSelf)

    // 通过项目 ID 获取项目数据
    const projects : string[] = [];

    if (isSelf === 'false') {
        // 从 Redis 中获取所有项目的 ID
        console.log('Fetch Projects, Public ')

        const projectIds = await client.lrange('projectIds', 0, -1);
        if (projectIds) {
            console.log('开始获取projects')
            const multi = client.multi();

            projectIds.forEach((projectId) => {
                console.log('获取project ' + projectId)
                multi.hgetall(`${projectId}`);
            });

            console.log(projectIds.length)

            const replies: string[] = await multi.exec()
            if (replies) {
                // 处理每个项目的数据
                replies.forEach((reply) => {
                    if (reply) {
                        projects.push(reply);
                    }
                });

                return res.status(200).json({projects});
            }
        }

        return res.status(500).json({ message: 'Failed to fetch projects' });

    } else if (isSelf === 'true') {
        if (type === '1' || type === '2') {
            console.log('Fetch Projects, Private ')
            // 返回Launch Fund List
            return fetchFundListByType(type, username, res);
        } else {
            return res.status(500).json({ message: 'Failed to fetch projects' });
        }
    } else {
        return res.status(500).json({ message: 'Failed to fetch projects' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}