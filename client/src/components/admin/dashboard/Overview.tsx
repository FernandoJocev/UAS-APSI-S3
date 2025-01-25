const Rupiah = Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

const Overview = () => {
  return (
    <div className='flex flex-col gap-y-[24px]'>
      <h1 className='font-bold text-[21px]'>Overview</h1>

      <div className='grid grid-cols-3 gap-x-[16px]'>
        <div className='flex flex-col gap-y-[8px] border-solid border border-[#BABABA] rounded-[16px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]'>
          <h1 className='text-[12px] opacity-80 uppercase'>Pendapatan</h1>

          <h1 className='font-extrabold text-[27px]'>
            {Rupiah.format(1057567980)}
          </h1>

          <div className='flex items-center cursor-pointer text-[9px]'>
            <h1 className='bg-[#CFF7D3] text-[#02542D] pt-[10px] pr-[8px] pb-[10px] pl-[8px] rounded-[4px] font-bold'>
              +100.100%
            </h1>
          </div>
        </div>

        <div className='flex flex-col gap-y-[8px] border-solid border border-[#BABABA] rounded-[16px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]'>
          <h1 className='text-[12px] opacity-80 uppercase'>Total Tiket Terjual</h1>

          <h1 className='font-extrabold text-[27px]'>
            {new Intl.NumberFormat().format(99999)}
          </h1>

          <div className='flex items-center cursor-pointer text-[9px]'>
            <h1 className='bg-[#CFF7D3] text-[#02542D] pt-[10px] pr-[8px] pb-[10px] pl-[8px] rounded-[4px] font-bold'>
              +100.100%
            </h1>
          </div>
        </div>

        <div className='flex flex-col gap-y-[8px] border-solid border border-[#BABABA] rounded-[16px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]'>
          <h1 className='text-[12px] opacity-80 uppercase'>Total Customer</h1>

          <h1 className='font-extrabold text-[27px]'>
            {9999}
          </h1>

          <div className='flex items-center cursor-pointer text-[9px]'>
            <h1 className='bg-[#CFF7D3] text-[#02542D] pt-[10px] pr-[8px] pb-[10px] pl-[8px] rounded-[4px] font-bold'>
              +100.100%
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
