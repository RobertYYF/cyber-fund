"use client";
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {createProject} from "@/services/etherservice";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import axios from "axios";
import {useRouter} from "next/navigation";
import User from "@/interfaces/User";
import crypto from 'crypto';

export default function LaunchFundPage() {

  const router = useRouter();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = localStorage.getItem('username');
  // const currentUser: User = useSelector((state) => state.user);

  function generateIdFromString(inputString: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
  }

  useEffect(() => {
    // 检查登录状态
    if (!isLoggedIn) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(false);

    if (!isChecked) {
      console.log("here")
      setFormError(true);
    } else {
      console.log("pass here")
      // 线上逻辑
      /*createProjectEther().then( result =>
          {
            console.log('Project Creat Success!');
            createProjectAPI();
          }
      ).catch(e => {
        console.log(e);
      });*/

      // test
      createProjectAPI();

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
    try {
      const result = await createProject(date, name, description);
      console.log('Transaction hash:', result.hash);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function createProjectAPI() {
    try {
      await axios.post('http://localhost:3001/create_project', {
        username: currentUser,
        projectId: generateIdFromString(title),
        projectName: title,
        projectOwner: currentUser,
        projectGoal: goal,
        deadline: date,
        description: description
      });
      router.push("/personal/launched_fund")
    } catch (error) {
      console.error(error);
      console.log('create project failed')
      setCreateError(true)
    }
  }

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
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Launch
            </button>
          </div>
        </form>
      </main>
      <div className="mt-10 flex items-center justify-end gap-x-6">
      </div>
      <Footer />
    </>
  )
}