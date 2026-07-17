import React from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Packages from '@/components/Packages'

const Home = () => {
  return (
    <PublicLayout>
      <Hero />
      <Features />
      <Packages />
    </PublicLayout>
  )
}
export default Home
