import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'  
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Plan from './pages/Plan';
import Options from './pages/Options';
import Moments from './pages/Moments';
import Message from './pages/Message';
import Journey from './pages/Journey';
import Compliments from './pages/Compliments';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        

function App() {

  return (
    <>
      <PrimeReactProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Landing />}></Route>
              <Route path='/message' element={<Message />}></Route>
              <Route path='/plan' element={<Plan />}></Route>
              <Route path='/options' element={<Options />}></Route>
              <Route path='/moments' element={<Moments />}></Route>
              <Route path='/journey' element={<Journey />}></Route>
              <Route path='/compliments' element={<Compliments />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </PrimeReactProvider>
    </>
  )
}

export default App
