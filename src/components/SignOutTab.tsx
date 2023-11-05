'use client';
import React, { useState } from 'react';
import {useRouter} from "next/navigation";

function SignOutTab({ inputClassName }: { inputClassName: string } ) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = localStorage.getItem('username');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    router.refresh()
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