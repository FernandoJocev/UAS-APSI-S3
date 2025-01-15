import Components from '../../utils/Components'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-y-[48px] pt-[24px] pr-[48px] pb-[24px] pl-[48px]'>
      <Components.Navbar />

      <section id='overview'>
        <Components.Overview />
      </section>

      <section id='chart'>
        <Components.Chart />
      </section>
    </div>
  )
}

export default Dashboard
