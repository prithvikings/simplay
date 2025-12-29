import React from 'react'
import {AnimatedThemeToggle} from '../../components/animated-theme-toggle'
const Navbar = () => {
  return (
    <div className='bg-zinc-100 dark:bg-zinc-900 border border-dashed border-t-0 pt-4 pb-4 px-6 flex justify-between items-center'>
      <div className='logo'>
        <h2 className='text-xl text-zinc-900 dark:text-zinc-50 font-spacegrotesk'>Simplay</h2>
      </div>
      <div className='flex items-center gap-2'>
        <AnimatedThemeToggle className={"h-8 px-1.5 py-1 bg-zinc-300 dark:bg-zinc-950 text-sm"}/>
         <button className='cursor-pointer bg-zinc-300 dark:bg-zinc-800 px-2 py-1 rounded-md font-inter font-medium text-sm text-zinc-900 dark:text-zinc-50 hover:bg-zinc-400 dark:hover:bg-zinc-700 transition duration-300'>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Navbar