import React from 'react'

export const Footer = () =>   {
  return (
    <footer className="bg-primary-400 py-6 text-sm leading-5 tracking-normal text-white lg:bg-transparent lg:text-gray-400">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-white">&copy; Book Tennis 2024</div>
        </div>
      </div>
    </footer>
  )
}