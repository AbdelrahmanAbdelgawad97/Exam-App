import { Book, Brain, FolderCode, Text } from 'lucide-react'
import { Outlet } from 'react-router'
import Header from "./Header.js"
export default function AuthLayout() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
      
      <Header />

      <main className='flex flex-col items-center justify-center'>
        <Outlet />
      </main>
    </div>

  )
}
