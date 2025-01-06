const TicketSearching = () => {
  return (
    <div className='flex flex-col gap-y-[28px]'>
      <div>
        <h1 className='font-bold text-title text-[#3f3e3e]'>
          Cari Tiket Anda!
        </h1>
        <p className='text-p font-[600]'>
          Atur Jadwal Kedatangan Anda di Pelabuhan
        </p>
      </div>

      <div className='flex flex-col gap-y-8'>
        <div className='grid grid-cols-3 gap-8'>
          <div className='flex flex-col gap-y-[4px]'>
            <label htmlFor='p_asal'>Pelabuhan Asal</label>
            <input type='text' name='p_asal' />
          </div>

          <div className='flex flex-col gap-y-[4px]'>
            <label htmlFor='p_asal'>Kelas Layanan</label>
            <input type='text' name='k_layanan' />
          </div>

          <div className='flex flex-col gap-y-[4px]'>
            <label htmlFor='p_asal'>
              Jadwal Masuk Pelabuhan <b>(Check In)</b>
            </label>
            <input type='text' name='check_in' />
          </div>

          <div className='flex flex-col gap-y-[4px]'>
            <label htmlFor='p_asal'>Pelabuhan Tujuan</label>
            <input type='text' name='p_tujuan' />
          </div>

          <div className='flex flex-col gap-y-[4px]'>
            <label htmlFor='p_asal'>Pelabuhan Asal</label>
            <input type='text' name='p_asal' />
          </div>

          <div className='flex flex-col gap-y-[4px]'>
            <label htmlFor='p_asal'>Penumpang</label>
            <input type='text' name='jlh_penumpang' />
          </div>
        </div>

        <button className='w-fit self-end bg-blue-300 text-white pt-3 pb-3 pl-8 pr-8 rounded-full font-bold hover:shadow-md transition-all !duration-200 ease-in-out'>
          Cari Jadwal
        </button>
      </div>
    </div>
  )
}

export default TicketSearching
