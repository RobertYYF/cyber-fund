'use client';
import React, { useState } from 'react';
import {Button} from "@/components/Button";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import axios from "axios";
import {login, logout} from "@/redux/actions";
import {useRouter} from "next/navigation";
import User from "@/interfaces/User";

const sampleImg = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

function SignOutTab({inputClassName}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser: User = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const handleSignOut = async () => {
    let name = currentUser.username
    try {
      console.log("Sign out", name)
      const response = await axios.post('http://localhost:3001/signout', {
        username: name
      });
      console.log('Sign out 成功回调', response.data);
    } catch (error) {
      console.error('Sign out 失败回调', error);
    }
    dispatch(logout())
    router.push("/")
  };

  return (
      <>
        <a className={inputClassName} onClick={handleSignOut}>
          Sign out
        </a>
      </>
  );
}

export default SignOutTab;