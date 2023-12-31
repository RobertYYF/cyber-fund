'use client'

import {Fragment, useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import AvatarWithDropdown from "@/components/AvatarMenu";
import SignOutTab from "@/components/SignOutTab";
import FundDetail from "@/interfaces/FundDetail";

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="/fund/fundls_public">Fund Pool</MobileNavLink>
            <MobileNavLink href="/fund/launch_fund">Raise Fund</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            {isLoggedIn ? (
              // 登录状态下显示的内容
              <div>
                <MobileNavLink href="/personal/profile">Profile</MobileNavLink>
                <MobileNavLink href="/personal/participated_fund">Participated Fund</MobileNavLink>
                <MobileNavLink href="/personal/launched_fund">Launched Fund</MobileNavLink>
                <SignOutTab inputClassName="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"/>
              </div>
            ) : (
              <div>
                <MobileNavLink href="/auth/login">Sign in</MobileNavLink>
              </div>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {

   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   useEffect(() => {

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

    console.log('登录状态 ', isLoggedIn)
    console.log('组件加载完成');
    console.log('登录状态： ' + isLoggedIn)

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等

    };
  }, []);

  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/fund/fundls_public">Fund Pool</NavLink>
              <NavLink href="/fund/launch_fund">Raise Fund</NavLink>
            </div>
          </div>

          {isLoggedIn ? (
            // 登录状态下显示的内容
            <div className="flex hidden sm:block items-center gap-x-5 md:gap-x-8">
              <AvatarWithDropdown/>
            </div>
          ) : (
            // 未登录状态下显示的内容
            <div className="flex items-center gap-x-5 md:gap-x-8 md:flex">
              <div className="hidden md:block">
                <NavLink href="/auth/login">Sign in</NavLink>
              </div>
              <Button href="/auth/register" color="blue">
                <span>
                  Get started <span className="hidden lg:inline">today</span>
                </span>
              </Button>
            </div>
          )}

          <div className="-mr-1 md:hidden">
            <MobileNavigation isLoggedIn={isLoggedIn}/>
          </div>
        </nav>
      </Container>
    </header>
  )
}
