import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const LandingPage = () => {
  return (
    <div className='bg-zinc-50 dark:bg-zinc-950 min-h-screen '>
      <div className='max-w-5xl mx-auto'>
        <Navbar />
        <Hero />
      </div>
    </div>
  )
}

export default LandingPage