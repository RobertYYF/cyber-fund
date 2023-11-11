"use client";

import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import React, {useEffect, useState} from "react";
import FundDetail from "@/interfaces/FundDetail";
import {contractAddress, donate} from "@/services/etherservice";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";
import Web3 from 'web3';
import {ethers} from "@axiomesh/axiom";

export default function FundEngagePage() {

  const router = useRouter();

  const [fundDetailData, setFundDetailData] = useState<FundDetail | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const queryParams = useSearchParams();
  const fundDetailStr = queryParams?.get('detail');
  const parsedFundDetail = fundDetailStr ? JSON.parse(decodeURIComponent(fundDetailStr)) : null;

  let currentUser: string | null = null;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const addToHistory = async () => {
      try {
        const response = await axios.post<FundDetail>('/api/engage_fund',{
            username: localStorage.getItem("username"),
            projectId: parsedFundDetail.projectId
        });
        console.error('更新到User成功:');
        } catch (error) {
          console.error('请求错误:', error);
        }
    };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await donate(parsedFundDetail.projectId, localStorage.getItem("username") || '', {value: ethers.parseEther(amount)});
    if (res) {
      await addToHistory();
      console.log('Donate success')
      router.push('/personal/participated_fund')
    }
  }
  const connectToMetaMask = async () => {
    if (typeof window !== 'undefined') {
      if (window.ethereum) {
        try {
          // 请求用户授权
          await window.ethereum.request({method: 'eth_requestAccounts'});
          // 创建 Web3 实例
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Failed to connect to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not found');
      }
    }
  };

  const fetchAccounts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }
    };

  useEffect(() => {
    // 获取当前账户信息
    fetchAccounts();
  }, [web3]);

  useEffect(() => {

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    currentUser = localStorage.getItem('username');

    // 检查登录状态
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      // router.push("/auth/login")
    }
    console.log('组件加载完成 here');
    setFundDetailData(parsedFundDetail);

    connectToMetaMask();

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等

    };
  }, []);


  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-lg px-8">
        <form onSubmit={handleTransfer}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Please fill in relevant detail</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Notice: MetaMask is required in this step.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Recipient Address
                  </label>
                  <div className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{contractAddress}</div>

                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Amount
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input type="text" value={amount}  onChange={(e) => setAmount(e.target.value)} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
