'use client';
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
export default function Register() {

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit } = useForm();

  const handleRegister = async (input) => {
    let name = input.username
    let pwd = input.password

    try {
      const response = await axios.post('http://localhost:3001/register', {
        username: name,
        password: pwd,
      });
      console.log('注册成功 ', response.data); // 处理服务器响应
      router.push("/auth/login")
    } catch (error) {
      console.error(error);
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
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{' '}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>

      <form className="mt-10 grid grid-cols-1 gap-y-8" onSubmit={handleSubmit(handleRegister)} >
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

        <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
