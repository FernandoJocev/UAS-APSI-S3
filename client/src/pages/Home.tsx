import { useEffect } from 'react'
import Components from '../utils/Components'
import Swal from 'sweetalert2'
import { useSearchParams } from 'react-router'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has('logged_in')) {
      searchParams.delete('logged_in')
      setSearchParams(searchParams)
      Swal.fire({
        title: 'Berhasil Login!',
        text: 'Anda berhasil login.',
        showConfirmButton: true,
      })
    }
  })

  return (
    <div className='flex flex-col gap-y-[48px] pt-[24px] pr-[48px] pb-[24px] pl-[48px]'>
      <Components.Navbar />

      <section id='search'>
        <Components.TicketSearching />
      </section>

      <section id='tickets'>
        <Components.TicketsSection />
      </section>
    </div>
  )
}

export default Home
