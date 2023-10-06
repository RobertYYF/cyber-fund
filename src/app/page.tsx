'use client';
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PrimaryIntro } from '@/components/PrimaryIntro'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import {Provider, useSelector} from 'react-redux';
import store from '@/redux/store';
import {useEffect} from "react";
import axios from "axios";
import FundDetail from "@/interfaces/FundDetail";


export default function Home() {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

   useEffect(() => {
    console.log('组件加载完成');
    console.log('登录状态： ' + isLoggedIn)

    // 如果有清理操作，可以在返回的函数中进行
    return () => {
      console.log('组件卸载');
      // 进行清理操作，如取消网络请求、取消订阅等

    };
  }, []);

  return (
    <>
      <Provider store={store}>
      <Header />
      <main>
        <PrimaryIntro />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <Faqs />
      </main>
      <Footer />
      </Provider>
    </>
  )
}
