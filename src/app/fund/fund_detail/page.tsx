"use client"
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FundDetailComponent } from "@/components/FundDetail";

import FundDetail from "@/interfaces/FundDetail";
import { useRouter } from 'next/navigation';

export default function FundDetailPage() {

  const router = useRouter();

  return (
    <>
      <Header />
      <main>
        <FundDetailComponent />
      </main>
      <Footer />
    </>
  )
}