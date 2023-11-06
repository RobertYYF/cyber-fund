import { ethers } from '@axiomesh/axiom'
import abi from '@/configs/abi.json'
import {formatEther} from "ethers";

const contractAddress = '0x1080815F681c67efa4aA559261183a56674158dE'; // 智能合约地址
const contractABI = abi; // 智能合约的ABI

const provider = new ethers.BrowserProvider(window.ethereum);

const signer = provider.getSigner();

export async function donate(projectId: number) {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const result = await contract.donate(projectId);
}

// 调用 createProject
export async function createProject(deadline: number): Promise<string> {

  let projectId = ''

  const contract = new ethers.Contract(contractAddress, contractABI, await signer);
  // 调用 createProject 方法
    const transaction = await contract.createProject(deadline);

    // 等待交易确认
    await transaction.wait();

    // 获取返回值
    const filter = contract.filters.ProjectCreated
    const events = await contract.queryFilter(filter, transaction.blockNumber, transaction.blockNumber);

    console.log('events: ', events);

    console.log('获得createProject return')

    console.log('events length: ', events.length)
    console.log('event[0]: ', events[0])

    const projectId = events[0]?.args.projectId;
    const startTime = events[0]?.args.startTime;
    console.log('projectId: ', projectId)
    console.log('startTime: ', startTime)

    return projectId
}
