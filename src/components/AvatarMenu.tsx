import React, {useRef, useState} from 'react';
import SignOutTab from "@/components/SignOutTab";
import Link from "next/link";
import useOutsideClick from "@/tools/clickOutSide";

const sampleImg = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

function RoundAvatarWithDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <img
        id="avatarButton"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={sampleImg}
        alt="User dropdown"
        onClick={toggleDropdown}
      />

      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="z-10 absolute right-0 mt-2 py-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                href="/personal/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/personal/participated_fund"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Engaged Fund
              </Link>
            </li>
            <li>
              <Link
                href="/personal/launched_fund"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Launched Fund
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <SignOutTab inputClassName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

export default RoundAvatarWithDropdown;