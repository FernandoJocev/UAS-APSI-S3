import axios from 'axios'
import { useEffect, useState } from 'react'
import { TicketInterface } from '../interfaces/Ticket'
import { Link } from 'react-router'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const Rupiah = Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

const TicketsSection = () => {
  const [tickets, setTickets] = useState<TicketInterface[]>([])

  const getTickets = async () => {
    await API.get('ticket/all')
      .then((result) => {
        setTickets(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTickets()
  }, [])

  return (
    <>
      <h1 className='text-center text-lg font-bold mb-[24px]'>
        Daftar Tiket Tersedia
      </h1>
      <div className='grid grid-cols-3 gap-8'>
        {tickets.map((ticket, key) => {
          return (
            <div
              className='flex flex-col bg-gray-100 pt-5 pb-5 pr-4 pl-4 rounded-sm shadow-md'
              key={key}
            >
              <div className='flex justify-between text-sm'>
                <div className='flex flex-col'>
                  <h1>Tiket Tersedia ({ticket.tersedia} kursi)</h1>
                  <h1>
                    {ticket.kota_asal} &rarr; {ticket.kota_tujuan}
                  </h1>
                  <h1>{ticket.tgl_berangkat}</h1>
                  <h1>{ticket.jadwal}</h1>
                </div>

                <div className='flex flex-col justify-between h-full'>
                  <h1>{Rupiah.format(ticket.harga)}</h1>

                  <div className='flex flex-col gap-y-3'>
                    <Link
                      className='bg-[#f7b917] hover:bg-[#dfaf37] transition-all ease-in-out !duration-200 font-bold rounded-full p-2 text-sm'
                      to={`/beli/${ticket.id}`}
                    >
                      Pesan Tiket
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TicketsSection
