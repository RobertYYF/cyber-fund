'use client';
import {useEffect, useState} from "react";
import axios from "axios";
import FundDetail from "@/interfaces/FundDetail";
import Link from "next/link";
import {AxiosRequestConfig} from "axios";
import User from "@/interfaces/User";
import {useSelector} from "react-redux";

const sampleImg = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export function FundList({ isSelf, type }) {
  const [fundListData, setFundListData] = useState<FundDetail[] | []>([]);
  const currentUser = localStorage.getItem('username');
  // const currentUser: User = useSelector((state) => state.user);

  useEffect(() => {
    // 创建一个取消令牌
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        // API请求时带上参数，区分是获取public list / private list
        const params = {
          isSelf: isSelf,
          type: type,
          username: currentUser || ''
        }

        const config: AxiosRequestConfig = {
            cancelToken: cancelTokenSource.token,
          };

        const response = await axios.get<FundDetail[]>('http://localhost:3001/fetch_projects',{
          params, ...config
        });
        // 获取众筹项目列表
        const jsonData = response.data;
        const data = jsonData.projects;

        console.log("return data ", data.length)

        // 更新状态
        setFundListData(data);

        } catch (error) {
          console.error('请求错误:', error);
        }
    };

    console.log('组件加载完成');
    fetchData()
    // mock
    // setFundListData(mockData)

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等
      // 取消请求
    };
  }, []);

  return (
    <div className="bg-white mb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {fundListData.map((project) => (
            <article key={project.projectId} className="flex max-w-xl flex-col items-start justify-between">
              <Link href={{ pathname: '/fund/fund_detail', query: { projectId: project.projectId }}}>
                <div className="flex items-center gap-x-4 text-xs">
                  <div className="text-gray-500">
                    {project.startTime}
                  </div>
                  <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {project.category}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <div>
                      <span className="absolute inset-0" />
                      {project.projectName}
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
                        {project.projectOwner}
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
