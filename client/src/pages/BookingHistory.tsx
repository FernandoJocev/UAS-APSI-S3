import { useEffect, useState } from 'react'
import axios from 'axios'
import Components from '../utils/Components'
import token from '../utils/Token'
import { TicketHistoryInterface } from '../interfaces/TicketHistory'

const API = axios.create({
  baseURL: 'http://localhost:3000/ticket/',
})

const Rupiah = Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

const BookingHistory = () => {
  const [histories, setHistory] = useState<TicketHistoryInterface[]>()

  const getHistory = async () => {
    await API.get('history', { headers: { Authorization: 'Bearer ' + token } })
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
                      Status :
                      <b className='font-bold opacity-70 items-end'>
                        {' ' + history?.status}
                      </b>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookingHistory
