import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Pages from './utils/Pages'
import AuthGuard from './components/middlewares/AuthGuard'
import Components from './utils/Components'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route index element={<Pages.Home />}></Route>
          <Route path='/masuk' element={<Pages.Login />}></Route>
          <Route path='/daftar' element={<Pages.Register />}></Route>
          <Route path='/beli/:id' element={<Pages.BeliTiket />}></Route>
          <Route path='/history' element={<Pages.BookingHistory />}></Route>

          {/* Admin Pages */}
          <Route path='/admin/' element={<AuthGuard />}>
            <Route index element={<Pages.Dashboard />}></Route>
            <Route
              path='validasi-reservasi'
              element={<Pages.ValidateTicket />}
            ></Route>
            <Route path='kelola-tiket' element={<Pages.ManageTicket />}></Route>
          </Route>

          <Route path='*' element={<Components._404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
