import React from 'react'
import { Link } from 'react-router-dom'

export const Header = ({ title }) => {
  return (
    <header className="relative py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h1 className="m-0 text-xl font-bold uppercase leading-none">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <span>{title}</span>
            </Link>
          </h1>
        </div>
      </div>
    </header>
  )
}