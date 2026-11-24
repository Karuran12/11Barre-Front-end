import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom'
import SignIn from './SignIn/SignIn'
import Club from './Club/Club'
import LDC from './LDC/LDC'
import './styles/Common.css'
import './styles/Modules.css'

function Layout(){return <div className="football-app"><header className="site-header"><div className="site-width nav-inner"><NavLink className="site-logo" to="/ldc"><span className="logo-mark">11</span><span>11barre</span></NavLink><nav aria-label="Navigation principale"><NavLink to="/ldc">LDC <small>▾</small></NavLink><a href="/ldc#classement">Pronos <small>▾</small></a><a href="/ldc#classement">Jeux <small>▾</small></a><NavLink to="/SignIn">Compte <small>▾</small></NavLink></nav></div></header><section className="ldc-banner"><div className="site-width"><div className="season">Saison 2026-2027 · Phase de ligue</div><h1>Ligue des champions</h1><nav className="ldc-tabs" aria-label="Rubriques LDC"><NavLink to="/ldc" end>Classement</NavLink><span className="unavailable-tab" title="Fonctionnalité non incluse dans ce module">Matchs</span><NavLink to="/club">Mon club</NavLink><span className="unavailable-tab" title="Fonctionnalité non incluse dans ce module">Billetterie</span></nav></div></section><main className="site-width"><Outlet/></main></div>}
createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><Routes><Route path="/SignIn" element={<SignIn/>}/><Route element={<Layout/>}><Route path="/ldc" element={<LDC/>}/><Route path="/club" element={<Club/>}/><Route path="/club/:id" element={<Club/>}/></Route><Route path="*" element={<Navigate to="/ldc" replace/>}/></Routes></BrowserRouter></StrictMode>)
