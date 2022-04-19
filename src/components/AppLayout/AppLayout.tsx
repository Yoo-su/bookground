import React from 'react'
import Navbar from '@components/Navbar';

interface propsType{
    children:React.ReactNode
}

export default function AppLayout({children}:propsType) {
  return (
    <div>
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  )
}
