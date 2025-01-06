import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import token from '../utils/Token'
import { userInterface } from '../interfaces/oauth'
import { checkToken } from '../utils/CheckToken'

const Navbar = () => {
  const [user, setUser] = useState<userInterface>()

  const getUser = () => {
    const user = jwtDecode(token!)
    setUser(user)
  }

  useEffect(() => {
    if (checkToken() != null && checkToken() != 'expired') {
      getUser()
    }
  }, [])

  return (
    <div className='w-full sticky flex items-center justify-between'>
      <h1 className='text-title font-bold cursor-pointer'>App Logo</h1>

      <div className='flex items-center gap-x-[18px]'>
        <h1 className='font-[700] cursor-pointer'>Cek Bookingan Anda</h1>

        <hr className='bg-black opacity-30 w-[2px] h-[24px]' />

        <h1 className='font-[700] cursor-pointer'>History Bookingan</h1>

        {user != null ? (
          <div className='flex gap-x-[8px] items-center cursor-pointer'>
            <img
              src={user.picture}
              alt='profile'
              className='!w-[28px] rounded-full'
            />

            <h1>{user.name}</h1>
          </div>
        ) : (
          <button
            onClick={() => {
              window.location.href = '/masuk'
            }}
            className='flex items-center gap-x-[8px] bg-[#F7F1F1] pt-[4px] pr-[18px] pb-[4px] pl-[18px] rounded-full cursor-pointer hover:bg-white hover:shadow-md transition-all ease-in-out !duration-300'
          >
            <i className='ri-account-circle-fill !text-[24px]'></i>

            <h1 className='font-[700]'>Login</h1>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
