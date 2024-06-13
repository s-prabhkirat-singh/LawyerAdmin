import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './pages/SignIn'
import { Outlet } from 'react-router-dom' 
import ProtectedRoutes from './utilites/protectedroutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen'>
    <ProtectedRoutes>
    <Outlet/>
    </ProtectedRoutes>
     
    </div>
  )
}

export default App
