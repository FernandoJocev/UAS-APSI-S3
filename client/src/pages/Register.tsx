import Components from '../utils/Components'

const Register = () => {
  return (
    <div className='w-full min-h-[100vh] flex flex-col justify-center items-center relative'>
      <video
        src='https://videos.pexels.com/video-files/854976/854976-uhd_2560_1440_30fps.mp4'
        loop
        muted
        autoPlay
        className='absolute min-w-[100vw] max-h-full -z-10 object-cover'
      ></video>

      <h1 className='text-title font-bold'>App Logo</h1>

      <Components.RegisterCard />
    </div>
  )
}

export default Register
