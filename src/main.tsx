import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './SignIn/SignIn'
import "./styles/Common.css"
import SignUp from './SignUp/SignUp'
import AccountSettings from './AccountSettings/AccountSettings'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/AccountSettings' element={<AccountSettings/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
