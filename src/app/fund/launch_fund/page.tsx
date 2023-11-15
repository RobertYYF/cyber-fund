"use client";
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {createProject} from "@/services/etherservice";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import crypto from 'crypto';

export default function LaunchFundPage() {

  const router = useRouter();
  let currentUser: string | null = null;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createFailed, setCreateFailed] = useState<boolean>(false);

  function generateIdFromString(inputString: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
  }

  useEffect(() => {
    setIsCreating(false);
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    currentUser = localStorage.getItem('username');

    // 检查登录状态
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push("/auth/login")
    }
    console.log('组件加载完成');
    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等
    };
  }, []);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [goal, setGoal] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategoryOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showFormError, setFormError] = useState(false);
  const [showCreateError, setCreateError] = useState(false);

  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };

  const handleDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDate(e.target.value);
  };

  const handleGoalChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setGoal(e.target.value);
  };

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCategoryOption(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setFormError(false); // 重新勾选时隐藏错误提示
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(false);

    if (!isChecked) {
      setFormError(true);
    } else {
      console.log("Start creating project");

      setIsCreating(true);

      const projectId = await createProjectEther();
      if (projectId != -1) {
        console.log('Project Creat Success!');
        await createProjectAPI(projectId);
      } else {
        setIsCreating(false);
        setCreateFailed(true);
      }

      // 重置表单字段
      setName('');
      setDate('');
      setCategoryOption('Others')
      setGoal('');
      setDescription('');
      setIsChecked(false);
      setFormError(false);
    }
  };

  async function createProjectEther() {

    console.log('here')

    let projectId = -1;
    const dateObject = new Date(date);
    const dateInSeconds = Math.floor(dateObject.getTime() / 1000);

    try {
      projectId = await createProject(dateInSeconds);
      console.log('Create Project Success', projectId);
    } catch (error) {
      console.error('Error:', error);
    }

    return projectId
  }

  async function createProjectAPI(projectId: number) {
    try {
      const response = await axios.post('/api/create_project', {
        username: localStorage.getItem('username'),
        projectId: projectId,
        projectName: title,
        projectOwner: localStorage.getItem('username'),
        projectGoal: goal,
        deadline: date,
        description: description
      });
      setIsCreating(false);
      router.push("/personal/launched_fund")
    } catch (error) {
      setIsCreating(false);
      setCreateFailed(true);
      console.error(error);
      console.log('create project failed')
      setCreateError(true)
    }
  }

  useEffect(() => {
    setCreateFailed(false);
    setIsCreating(false);
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-lg px-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Please fill in relevant detail</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="title"
                        onChange={handleTitleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Details about your project</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category"
                      defaultValue="Others"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleCategoryChange}
                    >
                      <option>Medical</option>
                      <option>Finance</option>
                      <option>Tech</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Funding Goal
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        type="number"
                        name="goal"
                        id="goal"
                        autoComplete="goal"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="goal"
                        onChange={handleGoalChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Deadline
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="deadline"
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      onChange={handleNameChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="criterion"
                          name="criterion"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <p className="text-gray-500">I have read and understood all the terms and conditions.</p>
                      </div>
                    </div>
              </div>

            </div>
          </div>

          <div className="text-sm leading-6">
              {showFormError && <p style={{ color: 'red' }}>Please complete all fields in the form.</p>}
          </div>

          <div className="text-sm leading-6">
              {showCreateError && <p style={{ color: 'red' }}>Project exists</p>}
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href="/" type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </Link>

            {isCreating ? (
                <div role="status"
                    className="rounded-md bg-indigo-600 px-3 py-2">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-w-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
              ): (
                 <div>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Launch
                    </button>
                </div>
              )
            }

            {createFailed ? (
                <div>
                    <div className="mb-4 mt-2 text-red-500">Create project failed, please try again.</div>
                </div>
              ): (
                 <div>
                </div>
              )
            }

          </div>
        </form>
      </main>
      <div className="mt-10 flex items-center justify-end gap-x-6">
      </div>
      <Footer />
    </>
  )
}