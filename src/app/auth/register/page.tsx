'use client';
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
export default function Register() {

  const router = useRouter();

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
        console.log('Registration successful:', data);
        router.push("/auth/login");
      } else {
        console.error('Registration failed:', data);
      }
    } catch (error) {
      console.error('Registration failed:', error);
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

      <RegisterForm onSubmit={handleRegister}/>
    </SlimLayout>
  )
}
