import { Faqs } from '@/components/Faqs'
import { PrimaryIntro } from '@/components/PrimaryIntro'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function Home() {
  return (
    <>
        <PrimaryIntro />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <Faqs />
    </>
  )
}
