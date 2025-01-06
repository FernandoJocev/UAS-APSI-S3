import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Pages from './utils/Pages'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Pages.Home />}></Route>
          <Route path='/masuk' element={<Pages.Login />}></Route>
          <Route path='/daftar' element={<Pages.Login />}></Route>
          <Route path='/beli/:id' element={<Pages.BeliTiket />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
