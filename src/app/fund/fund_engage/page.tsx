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
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [engageFailed, setEngageFailed] = useState<boolean>(false);

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
    if (amount === "") {
      setIsCreating(false);
      setEngageFailed(true);
      return;
    }

    setIsCreating(true);

    const res = await donate(parsedFundDetail.projectId, localStorage.getItem("username") || '', {value: ethers.parseEther(amount)});
    if (res) {
      await addToHistory();
      console.log('Donate success')
      setIsCreating(false);
      router.push('/personal/participated_fund')
    } else {
      setIsCreating(false);
      setEngageFailed(true);
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
    setEngageFailed(false);
    // 获取当前账户信息
    fetchAccounts();
  }, [web3]);

  useEffect(() => {

    setIsCreating(false);

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    currentUser = localStorage.getItem('username');

    // 检查登录状态
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push("/auth/login")
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

          {isCreating ? (
                <div role="status" className="mt-6 flex items-center justify-end gap-x-6">
                    <svg aria-hidden="true" className="mb-4 max-w-10 max-h-10 mr-2 text-gray-200 animate-spin dark:text-w-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
              ): (
                 <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md mb-4 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              )
            }

            {engageFailed ? (
                <div>
                    <div className="mb-4 mt-2 text-red-500">Participate failed, please try again.</div>
                </div>
              ): (
                 <div>
                </div>
              )
            }

        </form>
      </main>
      <Footer />
    </>
  )
}
