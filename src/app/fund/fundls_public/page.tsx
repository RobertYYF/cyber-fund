import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FundList } from '@/components/FundList'

export default function FundListPublic() {
  return (
    <>
      <Header />
      <main>
          <div className="bg-white mx-auto max-w-7xl lg:px-8">
              <div className="max-w-2xl lg:mx-0">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make your money more worthy</h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    Join us now and shaping the future
                  </p>
            </div>
          </div>
        <FundList />
      </main>
      <Footer />
    </>
  )
}