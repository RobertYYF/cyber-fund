'use client';
import {useEffect, useState} from "react";
import axios from "axios";
import FundDetail from "@/interfaces/FundDetail";
import Link from "next/link";

const sampleImg = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const mockData: FundDetail[] = [
  {
    id: 0,
    category: 'medical',
    title: '众筹Project Test 1',
    author: 'Author 1',
    intro: 'Project 1 Intro BalabalaBalabalaBalabala',
    start: 'Sep 10, 2023',
    end: 'Sep 30, 2023'
  },
  {
    id: 1,
    category: 'medical',
    title: '众筹Project Test 2',
    author: 'Author 2',
    intro: 'Project 2 Intro BalabalaBalabalaBalabala',
    start: 'Sep 20, 2023',
    end: 'May 1, 2024'
  },
  {
    id: 2,
    category: 'medical',
    title: '众筹Project Test 3',
    author: 'Author 3',
    intro: 'Project 3 Intro BalabalaBalabalaBalabala',
    start: 'Sep 1, 2023',
    end: 'June 9, 2024'
  },
  {
    id: 3,
     category: 'medical',
    title: '众筹Project Test 4',
    author: 'Author 4',
    intro: 'Project 4 Intro BalabalaBalabalaBalabala',
    start: 'May 9, 2022',
    end: 'June 9, 2024'
  },
]

export function FundList() {

  const [fundListData, setFundListData] = useState<FundDetail[] | []>([]);

  useEffect(() => {
    // 创建一个取消令牌
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        // API请求时带上参数，区分是获取public list / private list
        const response = await axios.get<FundDetail[]>('https://获取FundList的API',{
        cancelToken: cancelTokenSource.token, // 将取消令牌传递给请求配置
      });
        // 获取众筹项目列表
        const data = response.data;
        // 更新状态
        setFundListData(data);

        } catch (error) {
          console.error('请求错误:', error);
        }
    };

    console.log('组件加载完成');
    fetchData().then((responseData) => {
        // 处理解析后的数据
        console.log('请求成功，解析后的数据:', responseData);
        // 执行其他逻辑...
      });

    // mock
    setFundListData(mockData)

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等
      // 取消请求
      cancelTokenSource.cancel('请求被取消');
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {fundListData.map((project) => (
            <article key={project.id} className="flex max-w-xl flex-col items-start justify-between">
              <Link href={{ pathname: '/fund/fund_detail', query: { detail: encodeURIComponent(JSON.stringify(project)) }}}>
                <div className="flex items-center gap-x-4 text-xs">
                  <div className="text-gray-500">
                    {project.start}
                  </div>
                  <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {project.category}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <div>
                      <span className="absolute inset-0" />
                      {project.title}
                    </div>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{project.intro}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={ sampleImg } alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <div>
                        <span className="absolute inset-0" />
                        {project.author}
                      </div>
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
