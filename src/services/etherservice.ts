import { ethers } from '@axiomesh/axiom'
import { NextApiRequest, NextApiResponse } from 'next';
import abi from '@/configs/abi.json'

const contractAddress = '0xa2a3c74416662712d71044A15A9406E623490fAD'; // 智能合约地址
const contractABI = abi; // 智能合约的ABI

const provider = new ethers.JsonRpcProvider("https://rpc1.aries.axiomesh.io");

export async function donate(projectId: number) {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const result = await contract.donate(projectId);
    
}

// 调用 createProject 方法
export async function createProject(deadline: number) {
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const result = await contract.createProject(deadline);

}

