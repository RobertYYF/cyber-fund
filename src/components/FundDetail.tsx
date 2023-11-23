'use client';
import {Button} from "@/components/Button";
import {useEffect, useState} from "react";
import FundDetail, {FundDetailClass} from '@/interfaces/FundDetail';
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import axios, {AxiosRequestConfig} from "axios";
import {formatDate} from "@/tools/stringformat";
import FundDetailResponse from "@/interfaces/FundDetailResponse";
import {cancelProject, getDonationById, getFundDetailById, withdrawFunds} from "@/services/etherservice";
import DonationList from "@/components/DonationList";

export function FundDetailComponent() {

  const [fundDetailData, setFundDetailData] = useState<FundDetail | null>(null);
  const [isOwner, setIsOwner] = useState<boolean | null>(false);

  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  const [projectClosedState, setProjectClosedState] = useState<boolean>(false)

  const queryParams = useSearchParams()
  const projectId = queryParams?.get('projectId') || ''

  const [donationList, setDonationList] = useState<Donation[] | []>([]);

  const router = useRouter();

  const updateElement = (data: FundDetail) => {
    setFundDetailData(data);
  };

  const fetchFundDetailEther = async (projectId: string) => {
    const etherProject = await getFundDetailById(projectId);

    console.log('fetchFundDetailEther, ', etherProject, fundDetailData)

    let fundDetailRef = null;

    if (fundDetailData == null) {
        fundDetailRef = new FundDetailClass();
    } else {
        fundDetailRef = fundDetailData
    }

    if (etherProject) {
      fundDetailRef.fundReleased = etherProject.fundsReleased
      fundDetailRef.approvalDeadline = Number(etherProject.approvedDeadline)
      fundDetailRef.isApproved = etherProject.isApproved
      fundDetailRef.startTime = Number(etherProject.startTime)
      fundDetailRef.deadline = Number(etherProject.deadline)
      fundDetailRef.projectClosed = etherProject.projectClosed

      const startTimeDate = new Date(Number(etherProject.startTime) * 1000);
      const endTimeDate = new Date(Number(etherProject.deadline) * 1000);
      setStartTime(startTimeDate.toDateString());
      setEndTime(endTimeDate.toDateString());
      setProjectClosedState(etherProject.projectClosed);

      console.log('projectClosed state is: ', etherProject.projectClosed);
    }

    setFundDetailData(fundDetailRef);
  }

  const fetchDonationEther = async (projectId: string) => {
    const donationList = await getDonationById(projectId);
    const divisor = 1000000000000000000;
    // 将捐款金额转换为 number 类型
    donationList?.forEach((donation, index) => {
      console.log('Output number is: ', Number(donation.amount.valueOf()) / divisor)
      donation.parsedAmount = Number(donation.amount.valueOf()) / divisor
    })
    if (donationList) {
      setDonationList(donationList);
    }
  }

  const cancelProjectEther = async(projectId: string) => {
    const returnVal = await cancelProject(projectId);
    if (returnVal) {
      console.log("Cancel Project Success");
      router.push("/personal/launched_fund")
    }
  }

  const withdrawFundEther = async(projectId: string) => {
    const returnVal = await withdrawFunds(projectId);
    if (returnVal) {
      console.log("Withdraw Fund Success");
      router.push("/personal/launched_fund")
    }
  }

  const mainContent = (content: string) => {
    // 主体分段
    const paragraphs = content.split('\n');
    return (
      <div>
        {paragraphs.map((paragraph, index) => (
          <p className="mt-8" key={index}>{paragraph}</p>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // 检查登录状态
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push("/auth/login")
    }

    // 创建一个取消令牌
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
          const params = {
            projectId: projectId,
          };
          const config: AxiosRequestConfig = {
            cancelToken: cancelTokenSource.token,
          };
        const response = await axios.get<FundDetailResponse>('/api/fetch_single_project',{
            params, ...config
        });
        // 获取响应数据
        const data = response.data.project;
        console.log('projectId', data);
        // 更新状态
        updateElement(data);
        // 更新owner状态
        setIsOwner(data.projectOwner === localStorage.getItem("username"))
        } catch (error) {
          console.error('请求错误:', error);
        }
    };

    console.log('组件加载完成');

    // 通过API获取
    fetchData();

    // 通过ether获取
    fetchFundDetailEther(projectId);
    fetchDonationEther(projectId);

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
    };
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <img
                className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                src="https://images.unsplash.com/photo-1630569267625-157f8f9d1a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
                alt=""
              />
              <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
              <div
                className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
              <figure className="relative isolate">
                <svg
                  viewBox="0 0 162 128"
                  fill="none"
                  aria-hidden="true"
                  className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/20"
                >
                  <path
                    id="0ef284b8-28c2-426e-9442-8655d393522e"
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  />
                  <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86} />
                </svg>
                <blockquote className="mt-6 text-xl font-semibold leading-8 text-white">
                  <p>
                    { fundDetailData?.intro || '' }
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-sm leading-6 text-gray-300">
                  <strong className="font-semibold text-white">{ fundDetailData?.projectOwner || '' }</strong>
                </figcaption>
              </figure>
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">{ fundDetailData?.category || '' }</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                { fundDetailData?.projectName || '' }
              </h1>
              <div className="max-w-xl">
                { mainContent(fundDetailData?.projectDescription || '') }
              </div>
            </div>

            <h2 className="mt-8 mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Donations</h2>

            <DonationList donations={donationList} />

            <h2 className="mt-8 mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Information</h2>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">{fundDetailData?.projectOwner}</dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Start</dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">{startTime}</dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">End</dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">{endTime}</dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Closed</dt>
                  {projectClosedState ? (
                      <div>
                        <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">True</dd>
                      </div>
                  ) : (
                      <div>
                        <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">False</dd>
                      </div>
                  )}
                </div>
            </dl>

            {isOwner ? (
              // Owner
              <div className="mt-10 flex-col flex max-w-xl">
                <Button className=" rounded-md bg-blue-600 px-9 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(event) => cancelProjectEther(projectId)}>
                  Cancel Project
                </Button>
                <Button className="mt-10 rounded-md bg-blue-600 px-9 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(event) => withdrawFundEther(projectId)}>
                  Withdraw Fund
                </Button>
              </div>

            ) : (
              // Normal User
              <div className="mt-10">
                {projectClosedState ? (
                    <div
                        className="rounded-md bg-gray-400 px-9 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      参与募资
                    </div>
                ) : (
                    <div>
                      <Link
                          href={{ pathname: '/fund/fund_engage', query: { detail: encodeURIComponent(JSON.stringify(fundDetailData)) }}}
                          type="button"
                          className="rounded-md bg-blue-600 px-9 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        参与募资
                      </Link>
                    </div>
                )}
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  )
}
