import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from './Layout/AppLayout'
import Home from './Home/Home'
import ComingSoon from './ComingSoon/ComingSoon'
import SignIn from './SignIn/SignIn'
import LdcRoutes from './LDC/ldcRoutes'
import "./styles/Common.css"
<<<<<<< HEAD
import "./styles/Tokens.css"
=======
import SignUp from './SignUp/SignUp'
>>>>>>> origin/SignIn_component_creation

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route element={<AppLayout/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/SignIn' element={<SignIn/>}></Route>
          <Route path='/ldc/*' element={<LdcRoutes/>}></Route>
          <Route path='*' element={<ComingSoon/>}></Route>
        </Route>
=======
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
>>>>>>> origin/SignIn_component_creation
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)