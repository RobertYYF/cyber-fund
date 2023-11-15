import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'What is a blockchain-based fundraising platform?',
      answer:
        'A blockchain-based fundraising platform utilizes blockchain technology to facilitate transparent and secure fundraising processes.',
    },
    {
      question: 'How does a blockchain-based fundraising platform ensure transparency?',
      answer: 'By leveraging blockchain\'s distributed ledger, all transactions and activities on the platform are recorded and visible to participants, ensuring transparency.',
    },
    {
      question: 'What advantages does blockchain bring to fundraising platforms?',
      answer:
        'Blockchain provides enhanced security, immutability of data, decentralized control, and increased trust among participants.',
    },
  ],
  [
    {
      question: 'How does a blockchain-based fundraising platform prevent fraud?',
      answer:
        'Due to blockchain\'s transparent nature and consensus mechanisms, fraudulent activities can be identified and prevented more effectively.',
    },
    {
      question:
        'Can individuals track the flow of funds in real-time on a blockchain-based fundraising platform?',
      answer:
        'Yes, blockchain technology allows donors, beneficiaries, and the public to monitor the movement of funds in real-time, ensuring transparency and accountability.',
    },
    {
      question:
        'Are transactions on a blockchain-based fundraising platform irreversible?',
      answer:
        'Yes, once a transaction is recorded on the blockchain, it becomes virtually impossible to alter or delete, ensuring the integrity of the fundraising process.',
    },
  ],
  [
    {
      question: 'What role do smart contracts play in a blockchain-based fundraising platform?',
      answer:
        'Smart contracts automate and enforce the terms and conditions of fundraising campaigns, eliminating the need for intermediaries and enhancing efficiency.',
    },
    {
      question: 'Can blockchain-based fundraising platforms facilitate global participation?',
      answer: 'Yes, blockchain\'s decentralized nature enables participation from individuals worldwide, overcoming geographical barriers and expanding the reach of fundraising efforts.',
    },
    {
      question: 'How does a blockchain-based fundraising platform protect user privacy?',
      answer:
        'Blockchain platforms can implement privacy features such as encryption and pseudonymity, safeguarding user data while maintaining transparency within the fundraising process.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
