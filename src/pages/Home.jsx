import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Packages from '../components/Packages'
import Footer from './Footer '

const Home = () => {
  return (
    <div>

      <Navbar />

      <Hero />

      <Features />

      <Packages />
      <Footer/>

    </div>
  )
}

export default Home