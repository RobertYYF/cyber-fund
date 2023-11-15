'use client';
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PrimaryIntro } from '@/components/PrimaryIntro'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import {useEffect} from "react";


export default function Home() {

   useEffect(() => {
    console.log('组件加载完成');
    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等

    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <PrimaryIntro />
        <PrimaryFeatures />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
