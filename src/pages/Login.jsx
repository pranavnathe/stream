import React from 'react'
import { Button, Container, LoginForm } from '../components'
import { useNavigate } from 'react-router-dom'

function Login() {
  
  const navigate = useNavigate()

  return (
    <Container className="flex justify-center dark:text-white dark:bg-backgroundDark">
      <div className='w-full shadow-2xl h-screen flex flex-col items-center justify-center'>
        <LoginForm />
        <p className='mb-2 opacity-60'>Dont have account no worry</p>
        <Button
        onClick={() => navigate("/register")}
        >
          Creat new Account
        </Button>
      </div>
    </Container>
  )
}

export default Login