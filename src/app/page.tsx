'use client'

import { CreateForm } from '@/components/layout/Create/CreateForm'

export default function Home() {
  return (
    <div className='max-sm:flex-col min-h-screen flex items-center justify-center'>
      <CreateForm />
    </div>
  )
}
