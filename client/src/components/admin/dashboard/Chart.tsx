'use client'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { useEffect, useState } from 'react'

const Chart = () => {
  const [months, setMonths] = useState<string[]>([])

  useEffect(() => {
    const d: string[] = []
    const date = new Date()

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

    for (let i = 0; i < 3; i++) {
      d[i] = months[date.getMonth()]
      date.setMonth(date.getMonth() - 1)
    }

    setMonths(d)
  }, [])

  return (
    <div>
      <h1 className='font-bold text-[21px]'>Chart</h1>

      {}
      <Line
        datasetIdKey='id'
        data={{
          labels: months,
          datasets: [
            {
              label: 'Total Tiket Terjual',
              data: [100, 430, 1280],
            },
          ],
        }}
      />
    </div>
  )
}

export default Chart
