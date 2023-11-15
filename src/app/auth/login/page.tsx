'use client';

import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import axios from "axios";
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/LoginForm";
import React, {useEffect, useState} from "react";
export default function Login() {

  const router = useRouter();
  const [isFail, setIsFail] = useState<boolean>(false);

  const handleLogin = async (formData: AuthFormData) => {
    console.log('here')
    let name = formData.username
    let pwd = formData.password
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, password: pwd }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFail(false);
        console.log('Login successful:', data);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', name);
        router.push("/");
      } else {
        setIsFail(true);
        console.error('Login failed:', data);
      }
    } catch (error) {
      setIsFail(true);
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    setIsFail(false);
  }, []);

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

      <LoginForm onSubmit={handleLogin} />

      {isFail ? (
          <div>
              <div className="mb-4 mt-2 text-red-500">login failed, please try again.</div>
          </div>
        ): (
           <div>
          </div>
        )
      }

    </SlimLayout>
  )
}
