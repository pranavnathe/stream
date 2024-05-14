import React from 'react'
import { Container, RegisterFrom } from '../components'

function Register() {
  return (
    <Container className="flex justify-center dark:bg-backgroundDark">
      <div className='shadow-2xl'>
        <RegisterFrom />
      </div>
    </Container>
  )
}

export default Register