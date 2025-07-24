'use client'

import dynamic from 'next/dynamic'

const BirthdayWebsite = dynamic(() => import('@/components/BirthdayWebsite'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-pink-300 opacity-75"></div>
        </div>
        <p className="text-lg font-semibold text-purple-600 animate-pulse">Loading Birthday Surprise... 🎉</p>
      </div>
    </div>
  )
})

export default function Home() {
  return (
    <BirthdayWebsite />
  )
}
