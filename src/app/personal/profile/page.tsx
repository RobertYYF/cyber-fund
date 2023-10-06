"use client"
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {useEffect, useState} from "react";
import Web3 from "web3";
import User from "@/interfaces/User";
import {useSelector} from "react-redux";
import Link from "next/link";

const tabs = [
  { name: 'Profile', href: '/personal/profile', current: true },
  { name: 'Participated Fund', href: '/personal/participated_fund', current: false },
  { name: 'Launched Fund', href: '/personal/launched_fund', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {

  const [walletAddress, setWalletAddress] = useState('');
  const currentUser: User = useSelector((state) => state.user);

  useEffect(() => {
    // 在组件加载后执行副作用操作
    console.log('组件加载完成');

    // 在这里可以执行其他操作，如发送网络请求、订阅事件等
    const getWalletAddress = async () => {
      // 检查 MetaMask 是否已安装
      if (typeof window.ethereum !== 'undefined') {
        try {
          // 判断用户代理字符串来确定是手机浏览器还是电脑浏览器
          const isMobileBrowser = /Mobi/i.test(navigator.userAgent);

          if (isMobileBrowser) {
            // 在移动设备上，请求用户在 MetaMask 移动应用程序中打开 DApp
            await window.ethereum.send('eth_requestAccounts');
          } else {
            // 在电脑浏览器上，请求用户授权
            await window.ethereum.enable();
          }

          // 使用 Web3.js 获取钱包地址
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();

          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error('授权失败:', error);
        }
      } else {
        console.error('MetaMask 未安装或未连接');
      }
    };

    getWalletAddress();

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等
    };
  }, []);

  var name = "Your Name";

  return (
    <>
      <Header />
        <div className="border-b border-gray-200 mx-auto flex max-w-lg">
          <div className="sm:flex sm:items-baseline">
            <h3 className="text-base font-semibold leading-6 text-gray-900">{name}</h3>
            <div className="mt-4 sm:ml-10 sm:mt-0">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <main className="py-10 mx-auto flex-col">
          <div className="mx-auto flex"> Username: {currentUser?.username} </div>
          <div className="mx-auto flex"> Wallet Address: {walletAddress} </div>
        </main>

      <Footer />
    </>
  )
}
