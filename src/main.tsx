import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './SignIn/SignIn'
import "./styles/Common.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
