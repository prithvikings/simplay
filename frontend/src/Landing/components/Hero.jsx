import React from "react";

const Hero = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed border-t-0 flex items-center min-h-[70vh] px-8 ">
        <div className="flex flex-col gap-8">
          <div>
          <h1 className="text-5xl font-spacegrotesk text-zinc-700 dark:text-zinc-700">
          Create  <span className="text-white">Beautiful </span>Invoices <br />
          Not <span className="dark:text-white text-zinc-600">Ugly</span> Ones
        </h1>
        </div>
        <div className="button flex items-center gap-4">
          <button
          className='cursor-pointer bg-zinc-300 dark:bg-sky-800 px-2 py-1 rounded-md font-inter font-medium text-sm text-zinc-900 dark:text-zinc-50 hover:bg-zinc-400 dark:hover:bg-sky-700 transition duration-300'
          >Get started</button>
          <button
          className='cursor-pointer bg-zinc-300 dark:bg-zinc-800 px-2.5 py-1 rounded-md font-inter  text-sm text-zinc-900 dark:text-zinc-50 hover:bg-zinc-400 dark:hover:bg-zinc-700 transition duration-300'
          >Start Open Source</button>
        </div>
        </div>
    </div>
  );
};

export default Hero;
