import React from 'react'
import Navbar from '@components/Navbar';

interface propsType{
    children:React.ReactNode
}

export default function AppLayout({children}:propsType) {
  return (
    <div>
        <header>
          <title>BookGround</title>
          <Navbar />
        </header>
        <main>
            {children}
        </main>
        <footer></footer>
    </div>
  )
}
