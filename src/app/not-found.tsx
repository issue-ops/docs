'use client'

import Image from 'next/image'
import supportcat from '../public/img/supportcat.png'

export default function Home() {
  return (
    <div className="grid items-center justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Image src={supportcat} alt="Supportcat" width={500} height={500} />
      <h1 className="text-2xl font-bold">
        Uh oh...this page doesn&apos;t exist!
      </h1>
    </div>
  )
}
