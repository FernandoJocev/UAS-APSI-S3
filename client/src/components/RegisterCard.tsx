import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { checkToken } from '../utils/CheckToken'
import Swal from 'sweetalert2'
import { Link } from 'react-router'
import axios, { AxiosRequestConfig } from 'axios'
import { AuthInterface } from '../interfaces/authForm'

const RegisterCard = () => {
  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
  })

  const [formData, setFormData] = useState<AuthInterface>({
    email: '',
    password: '',
  })

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await API.post('auth/login', new FormData(e.currentTarget))
      .then(async (result: AxiosRequestConfig) => {
        await API.get('auth/verify', {
          headers: {
            Authorization: 'Bearer ' + result.data.access_token,
          },
        })

        localStorage.setItem('token', result.data.access_token)

        return (window.location.href = '/?logged_in=true')
      })
      .catch((err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error :(',
          text: err,
          showConfirmButton: true,
        })
      })
  }

  useEffect(() => {
    if (checkToken() != null && checkToken() != 'expired') {
      window.location.href = '/'
    }
  }, [])

  return (
    <div className='login-card w-[35%]'>
      <div className='flex flex-col items-center w-full p-[24px] gap-y-[18px] bg-white rounded-[24px]'>
        <div className='flex flex-col gap-y-[8px] items-center'>
          <h1 className='text-secondary-title font-bold'>Daftar</h1>

          <p className='text-p'>
            Sudah punya akun?
            <Link to={'/masuk'} className='text-[#264693] ml-1'>
              {' '}
              Masuk sekarang
            </Link>
          </p>
        </div>

        <div>
          <GoogleOAuthProvider clientId='697879459442-hk7pn833aelvubhbfa445t5ulufa5lr0.apps.googleusercontent.com'>
            <GoogleLogin
              shape='pill'
              onSuccess={(credentialResponse) => {
                localStorage.setItem('token', credentialResponse.credential!)
                return (window.location.href = '/?logged_in=true')
              }}
              onError={() => {
                Swal.fire({
                  title: 'Error!',
                  icon: 'error',
                  text: 'Something is wrong :(',
                  showConfirmButton: true,
                })
              }}
            />
          </GoogleOAuthProvider>
        </div>

        <div className='middle-section text-center w-full relative'>
          <p className='min-w-full opacity-75 text-p'>atau</p>
        </div>

        <form
          className='flex flex-col w-full gap-y-[28px]'
          onSubmit={handleLogin}
        >
          {/* Name Input */}
          <div className='relative w-full flex flex-col'>
            <i className='ri-user-line absolute left-2 top-[7px]'></i>
            <input
              type='text'
              name='name'
              placeholder='Nama'
              onChange={inputHandler}
              className='w-full text-p'
            />
          </div>

          {/* Email Input */}
          <div className='relative w-full flex flex-col'>
            <i className='ri-mail-line absolute left-2 top-[7px]'></i>
            <input
              type='email'
              name='email'
              placeholder='Alamat Email'
              onChange={inputHandler}
              className='w-full text-p'
            />
            <label htmlFor='email' className='opacity-50 text-p'>
              cth: example@gmail.com
            </label>
          </div>

          {/* Password Input */}
          <div className='relative w-full h-fit'>
            <i className='ri-lock-line absolute left-2 top-[7px]'></i>
            <input
              type='password'
              name='password'
              placeholder='Kata Sandi'
              onChange={inputHandler}
              className='w-full text-p'
            />
          </div>

          {/* Confirm Password Input */}
          <div className='relative w-full h-fit'>
            <i className='ri-lock-line absolute left-2 top-[7px]'></i>
            <input
              type='password'
              name='c_password'
              placeholder='Konfirmasi Kata Sandi'
              onChange={inputHandler}
              className='w-full text-p'
            />
          </div>

          <button className='bg-[#f7b917] rounded-full p-[12px] text-white font-[700] cursor-pointer hover:bg-blend-darken ease-in-out transition-all'>
            Daftar
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterCard
