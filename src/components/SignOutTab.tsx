'use client';
import React, { useState } from 'react';
import {useRouter} from "next/navigation";

function SignOutTab({ inputClassName }: { inputClassName: string } ) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const handleSignOut = async () => {
    console.log('sign out')
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    router.push('/');
    router.refresh();
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