import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import axios from 'axios'
import token from '../utils/Token'
import { useEffect, useState } from 'react'
import { TicketInterface } from '../interfaces/ticket'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/ticket/',
})

const TicketPDF = () => {
  const [ticket, setTicket] = useState<TicketInterface>()

  const getTicket = async () => {
    await API.get('', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((result) => {
        setTicket(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTicket()
  }, [])

  return (
    <>
      <h1>{ticket?.nama_kapal}</h1>
    </>
  )
}

export default TicketPDF
