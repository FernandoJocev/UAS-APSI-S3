import Components from '../../utils/Components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import token from '../../utils/Token'
import { TicketHistoryInterface } from '../../interfaces/TicketHistory'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const Rupiah = Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

const ValidateTicket = () => {
  const [histories, setHistory] = useState<TicketHistoryInterface[]>()

  const getHistory = async () => {
    await API.get('ticket/admin/all', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((result) => {
        setHistory(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getHistory()
  }, [])
  return (
    <div className='flex flex-col gap-y-[48px] pt-[24px] pr-[48px] pb-[24px] pl-[48px]'>
      <Components.Navbar />

      <section id='validate-ticket search'>
        <div className='flex flex-col gap-y-[48px]'>
          <div className='flex items-center w-full gap-x-[53px]'>
            <h1 className='font-bold text-[21px]'>Daftar Reservasi (137)</h1>

            <div className='relative flex-1'>
              <i className='ri-search-line absolute left-2 top-[50%] translate-y-[-50%] text-[18px]'></i>
              <input
                type='text'
                className='w-full !rounded-full !h-[56px]'
                placeholder='Search'
              />
            </div>
          </div>

          <div className='flex flex-col gap-y-[24px]'>
            <h1 className='font-bold'>Hari ini</h1>

            <div className='flex flex-col gap-y-[24px]'>
              {histories?.map((history, key) => {
                return (
                  <div className='flex flex-col gap-y-2' key={key}>
                    <div className='flex flex-col gap-y-2 text-sm opacity-70 font-semibold'>
                      <h1>
                        {history?.kota_asal} &rarr; {history?.kota_tujuan}
                      </h1>

                      <h1>{history?.tgl_berangkat}</h1>
                    </div>

                    <div className='flex flex-col bg-gray-100 pt-5 pb-5 pr-4 pl-4 rounded-sm shadow-md'>
                      <div className='flex justify-between text-sm'>
                        <div className='flex flex-col gap-y-2'>
                          <h1>Jumlah Penumpang : ({history?.qty} Orang)</h1>
                          <h1>
                            {history?.kota_asal} &rarr; {history?.kota_tujuan}
                          </h1>
                          <h1>{history?.tgl_berangkat}</h1>
                          <h1>{history?.jadwal}</h1>
                        </div>

                        <div className='flex flex-col justify-between min-h-full gap-y-2'>
                          <h1>{Rupiah.format(history?.harga)}</h1>

                          <div className='flex flex-col gap-y-3'>
                            <h1>
                              <button
                                className='bg-[#f7b917] hover:bg-[#dfaf37] transition-all ease-in-out !duration-200 font-bold rounded-full p-2 text-sm w-full'
                                type='submit'
                              >
                                Konfirmasi
                              </button>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ValidateTicket
