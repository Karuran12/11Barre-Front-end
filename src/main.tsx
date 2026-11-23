import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './SignIn/SignIn'
import "./styles/Common.css"
import SignUp from './SignUp/SignUp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
