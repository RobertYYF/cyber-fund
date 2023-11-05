import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/db';

export default async function create_project(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {username, projectId, projectName, projectOwner, projectGoal, description, deadline} = req.body;

    const deadlineDate = new Date(deadline);
    const deadLineTimestamp = deadlineDate.getTime();

    // 构建项目对象
    const project = {
        projectId: projectId,
        projectName: projectName,
        projectOwner: projectOwner, // 假设已经进行了用户认证，并从请求中获取用户 ID
        projectGoal: projectGoal,
        startTime: Date.now(),
        deadline: deadLineTimestamp,
        projectDescription: description,
        approvalDeadline: deadLineTimestamp,
    };

    console.log('Project Detail' + projectId + projectName + projectGoal)

    const checkIfExist = await client.hgetall(projectId);
    if (checkIfExist) {
        console.log('同名project已存在')
        return res.status(409).json({message: '同名project已存在'});
    }

    const projectWriteResult = await client.hmset(projectId, project);
    if (projectWriteResult) {
        console.log('Project 写入成功');
        // projectId记录
        const writeProjectIdRes = await client.rpush('projectIds', [projectId]);
        if (writeProjectIdRes) {
            console.log('Project Id 写入成功')
        } else {
            console.error('Error updating projectId list in Redis');
        }

        const updateUserListRes = await client.rpush(`\$${username}:launch_fund`, projectId);
        if (updateUserListRes) {
            console.log('Project Id 写入个人成功')
        } else {
            console.error('Error updating launch_fund list in Redis:');
        }

        return res.status(201).json({message: 'Project写入成功'});
    }

    return res.status(500).json({message: 'Project写入失败'});
  }

  return res.status(405).json({ message: 'Method not allowed' });
}