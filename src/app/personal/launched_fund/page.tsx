import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import { FundList } from '@/components/FundList';
import Link from "next/link";

const tabs = [
  { name: 'Profile', href: '/personal/profile', current: false },
  { name: 'Participated Fund', href: '/personal/participated_fund', current: false },
  { name: 'Launched Fund', href: '/personal/launched_fund', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LaunchedFundPage() {

  var name = "Your Name";

  return (
    <>
      <Header />
        <div className="border-b border-gray-200 mx-auto flex max-w-lg">
          <div className="sm:flex sm:items-baseline">
            <h3 className="text-base font-semibold leading-6 text-gray-900">{name}</h3>
            <div className="mt-4 sm:ml-10 sm:mt-0">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <main className="py-10 mx-auto flex">
            <FundList/>
        </main>
      <Footer />
    </>
  )
}
