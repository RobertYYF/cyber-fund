"use client";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import { FundList } from '@/components/FundList';
import Link from "next/link";
import User from "@/interfaces/User";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const tabs = [
  { name: 'Profile', href: '/personal/profile', current: false },
  { name: 'Participated Fund', href: '/personal/participated_fund', current: false },
  { name: 'Launched Fund', href: '/personal/launched_fund', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LaunchedFundPage() {

    const router = useRouter();
    let currentUser: string | null = null;

  useEffect(() => {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    currentUser = localStorage.getItem('username');

    if (!isLoggedIn) {
      router.push('/auth/login')
    }
    // 在组件加载后执行副作用操作
    console.log('组件加载完成');

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等
    };
  }, []);

  return (
    <>
      <Header />
        <div className="border-b border-gray-200 mx-auto flex max-w-lg">
          <div className="sm:flex sm:items-baseline">
            <h3 className="text-base font-semibold leading-6 text-gray-900">{currentUser}</h3>
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

        <main className="py-10 mx-auto flex-row">
            <div className="flex items-center justify-center">
                <h5 className=" text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Created Fund</h5>
            </div>
            <FundList isSelf={true} type={1}/>
        </main>
      <Footer />
    </>
  )
}
