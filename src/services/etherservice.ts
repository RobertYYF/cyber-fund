import { ethers } from '@axiomesh/axiom'
import { NextApiRequest, NextApiResponse } from 'next';
import abi from '@/configs/abi.json'

const contractAddress = '0xa2a3c74416662712d71044A15A9406E623490fAD'; // 智能合约地址
const contractABI = abi; // 智能合约的ABI

const provider = new ethers.JsonRpcProvider("https://rpc1.aries.axiomesh.io");

export async function donate(req: NextApiRequest, res: NextApiResponse) {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const result = await contract.donate();

    res.status(200).json({ result });
}

// 调用 createProject 方法
export async function createProject(deadline: string, personalInfo: string, projectDescription: string) {
  // 获取用户钱包
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();

  // 使用钱包进行交易
  const contractWithSigner = contract.connect(signer);
  const result = await contractWithSigner.createProject(deadline, personalInfo, projectDescription);

  return result;
}