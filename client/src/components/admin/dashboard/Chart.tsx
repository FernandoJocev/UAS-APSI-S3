'use client'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend)

const Chart = () => {
  const [months, setMonths] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    const d: string[] = []
    const date = new Date()
    const datas = []

    const months: string[] = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]

    for (let i = 0; i < 13; i++) {
      d[i] = months[date.getMonth()]
      date.setMonth(date.getMonth() - 1)
      datas[i] = Math.floor((Math.random() * 10000) / 100) * 100
    }

    setData(datas)
    setMonths(d)
  }, [])

  return (
    <div>
      <h1 className='font-bold text-[21px]'>Chart</h1>

      {}
      <Bar
        datasetIdKey='id'
        data={{
          labels: months,
          datasets: [
            {
              label: 'Total Tiket Terjual',
              data: data,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
          animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
          },
        }}
      />
    </div>
  )
}

export default Chart
