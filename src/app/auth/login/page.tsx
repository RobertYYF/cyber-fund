'use client';

import Link from 'next/link'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import axios from "axios";
import { useRouter } from 'next/navigation';
import {useDispatch, useSelector} from "react-redux";
import {login, setUserAction} from "@/redux/actions";
import {useForm} from "react-hook-form";
import User from "@/interfaces/User";
export default function Login() {

  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const handleLogin = async (input) => {
    let name = input.username
    let pwd = input.password

    try {
      console.log("尝试登录 name ", name)
      console.log("尝试登录 pwd ", pwd)
      const response = await axios.post('http://localhost:3001/login', {
        username: name,
        password: pwd,
      });
      const token = response.data.token;
      // 将令牌存储在本地
      localStorage.setItem('token', token);
      // 临时方案，用localStorage存登录状态
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', name)
      let user: User = {
        username: name,
        address: ''
      }
      dispatch(login());
      dispatch(setUserAction(user));
      console.log('登录成功回调', response.data); // 处理服务器响应
      router.push("/")
    } catch (error) {
      console.log('错误出现');
      console.error('登录失败回调', error);
    }
  };

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{' '}
        <Link
          href="/auth/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>{' '}
        for a free trial.
      </p>

      <form className="mt-10 grid grid-cols-1 gap-y-8" onSubmit={handleSubmit(handleLogin)} >
        <div className="flex flex-col">
          <span className="py-2">Username</span>
          <input
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            {...register("username")} />
        </div>
          <div className="flex flex-col">
          <span className="py-2">Password</span>
          <input
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            {...register("password")} />
        </div>

        <Button type="submit" variant="solid" color="blue" className="w-full">
          <span>
            Sign in <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </form>
    </SlimLayout>
  )
}
