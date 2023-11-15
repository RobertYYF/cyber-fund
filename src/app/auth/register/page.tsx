'use client';
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import {useRouter} from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import React, {useEffect, useState} from "react";
export default function Register() {

  const router = useRouter();
  const [isFail, setIsFail] = useState<boolean>(false);


  const handleRegister = async (formData: AuthFormData) => {

    let name = formData.username
    let pwd = formData.password

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, password: pwd }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFail(false);
        console.log('Registration successful:', data);
        router.push("/auth/login");
      } else {
        setIsFail(true);
        console.error('Registration failed:', data);
      }
    } catch (error) {
      setIsFail(true);
      console.error('Registration failed:', error);
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

      <RegisterForm onSubmit={handleRegister}/>
      {isFail ? (
          <div>
              <div className="mb-4 mt-2 text-red-500">Register failed, please try again.</div>
          </div>
        ): (
           <div>
          </div>
        )
      }
    </SlimLayout>
  )
}
