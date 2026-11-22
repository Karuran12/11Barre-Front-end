import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './SignIn/SignIn'
import LdcRoutes from './LDC/ldcRoutes'
import "./styles/Common.css"
import "./styles/Tokens.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/ldc/*' element={<LdcRoutes/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)