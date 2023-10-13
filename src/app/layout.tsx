'use client';
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import {Provider} from "react-redux";
import store from '@/redux/store';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Provider store={store}>
        <html
          lang="en"
          className={clsx(
            'h-full scroll-smooth bg-white antialiased',
            inter.variable,
            lexend.variable,
          )}
        >
          <body className="flex h-full flex-col">{children}</body>
        </html>
      </Provider>
    </>
  )
}