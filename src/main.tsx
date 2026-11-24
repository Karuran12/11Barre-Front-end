import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from './Layout/AppLayout'
import Home from './Home/Home'
import ComingSoon from './ComingSoon/ComingSoon'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import LdcRoutes from './LDC/ldcRoutes'
import "./styles/Common.css"
import "./styles/Tokens.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/SignIn' element={<SignIn/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/ldc/*' element={<LdcRoutes/>}></Route>
          <Route path='*' element={<ComingSoon/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
