import { FormEvent, useEffect } from 'react'
import { TicketInterface } from '../../../interfaces/ticket'

interface FormAddTicketPropsInterface {
  addTicket: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  ticket?: TicketInterface | null
}

const FormAddTicket: React.FC<FormAddTicketPropsInterface> = ({
  ticket,
  addTicket,
  handleCancel,
}) => {
  useEffect(() => {
    const inputs = document.getElementsByTagName('input')

    const tersedia = document.getElementById('tersedia')!
    const harga = document.getElementById('harga')!

    if (ticket != null) {
      tersedia.setAttribute('value', ticket.tersedia.toString())
      harga.setAttribute('value', ticket.harga.toString())
    } else {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('value', '')
      }
      console.log(inputs)
      tersedia.setAttribute('value', '')
      harga.setAttribute('value', '')
    }
  })

  return (
    <>
      {/* Form Section */}
      <form className='flex flex-col gap-y-[24px]' onSubmit={addTicket}>
        {/* First Row */}
        <div className='grid grid-cols-3 gap-x-[24px]'>
          <input
            type='hidden'
            name='id'
            value={ticket != null ? ticket?.id : ''}
          />

          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='n_kapal'>Nama Kapal</label>
            <input
              type='text'
              name='n_kapal'
              defaultValue={
                ticket != null && ticket?.nama_kapal != null
                  ? ticket.nama_kapal
                  : ''
              }
              key={
                ticket != null && ticket?.nama_kapal != null
                  ? ticket.nama_kapal
                  : ''
              }
              placeholder='Masukkan nama kapal'
              className='w-full text-p'
            />
          </div>

          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='k_kapal'>Kelas Kapal</label>
            <input
              type='text'
              name='k_kapal'
              placeholder='Pilih kelas kapal'
              className='w-full text-p'
            />
          </div>

          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='tersedia'>Kapasitas Kapal</label>
            <input
              type='number'
              name='tersedia'
              id='tersedia'
              defaultValue={
                ticket != null && ticket?.tersedia != null
                  ? ticket.tersedia
                  : ''
              }
              key={'tersedia'}
              placeholder='0'
              className='w-full text-p'
            />
          </div>
        </div>
        {/* End of First Row */}

        {/* Second Row */}
        <div className='grid grid-cols-2 gap-x-[24px]'>
          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='n_kapal'>Pelabuhan Berangkat</label>
            <input
              type='text'
              name='p_berangkat'
              defaultValue={
                ticket != null && ticket?.kota_asal != null
                  ? ticket.kota_asal
                  : ''
              }
              key={
                ticket != null && ticket?.kota_asal != null
                  ? ticket.kota_asal
                  : ''
              }
              placeholder='Pilih asal keberangkatan'
              className='w-full text-p'
            />
          </div>

          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='n_kapal'>Pelabuhan Tujuan</label>
            <input
              type='text'
              name='p_tujuan'
              defaultValue={
                ticket != null && ticket?.kota_tujuan != null
                  ? ticket.kota_tujuan
                  : ''
              }
              key={
                ticket != null && ticket?.kota_tujuan != null
                  ? ticket.kota_tujuan
                  : ''
              }
              placeholder='Pilih pelabuhan tujuan'
              className='w-full text-p'
            />
          </div>
        </div>
        {/* End of Second Row */}

        {/* Third Row */}
        <div className='grid grid-cols-2 gap-x-[24px]'>
          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='n_kapal'>Waktu Keberangkatan</label>
            <input
              type='text'
              name='berangkat'
              defaultValue={
                ticket != null && ticket?.jadwal != null
                  ? ticket.jadwal.split('-')[0]
                  : ''
              }
              key={
                ticket != null && ticket?.jadwal != null
                  ? ticket.jadwal.split('-')[0]
                  : ''
              }
              placeholder='Pilih waktu keberangkatan'
              className='w-full text-p'
            />
          </div>

          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='n_kapal'>Waktu Tiba</label>
            <input
              type='text'
              name='tiba'
              defaultValue={
                ticket != null && ticket?.jadwal != null
                  ? ticket.jadwal.split('-')[1]
                  : ''
              }
              key={
                ticket != null && ticket?.jadwal != null
                  ? ticket.jadwal.split('-')[1]
                  : ''
              }
              placeholder='Pilih waktu tiba'
              className='w-full text-p'
            />
          </div>
        </div>
        {/* End of Third Row */}

        {/* Fourth Row */}
        <div className='grid grid-cols-2 gap-x-[24px]'>
          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='n_kapal'>Tarif Normal</label>
            <input
              type='number'
              name='harga'
              id='harga'
              placeholder='0'
              className='w-full text-p'
            />
          </div>

          {/* <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='k_kapal'>Tarif Khusus (Opsional)</label>
            <input
              type='number'
              name='harga_khusus'
              placeholder='Pilih kelas kapal'
              className='w-full text-p'
            />
          </div> */}

          <div className='relative w-full flex flex-col gap-y-[12px]'>
            <label htmlFor='jlh_tersedia'>Keterangan (Opsional)</label>
            <input
              type='text'
              name='keterangan'
              placeholder='Keterangan...'
              className='w-full text-p'
            />
          </div>
        </div>
        {/* End of Fourth Row */}

        {/* Button Row */}
        <div className='flex gap-x-[8px]'>
          <button
            className='bg-[#EC8B32] rounded-[8px] p-[8px] text-white font-bold'
            id='submit-button'
            type='submit'
            data-type={ticket != null ? 'edit' : 'add'}
          >
            {ticket != null ? 'Edit Tiket' : 'Tambah Tiket'}
          </button>

          <button
            className='bg-transparent border border-solid border-slate-700 rounded-[8px] p-[8px] font-bold'
            type='button'
            onClick={handleCancel}
          >
            Batal
          </button>
        </div>
        {/* End of Button Row */}
      </form>
    </>
  )
}

export default FormAddTicket
