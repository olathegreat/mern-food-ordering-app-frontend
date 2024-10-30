import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'

export default function MobileNavLinks() {
    const {logout} = useAuth0()
  return (
    <>
    <Link className='flex bg-white items-center font-bold hover:text-orange-500' to="/user-profile">User Profile</Link>
      <Button onClick={()=>logout()} className='flex rounded bg-gray-500 items-center font-bold hover:text-orange-500'>
           Log Out
      </Button>
    </>
  )
}
