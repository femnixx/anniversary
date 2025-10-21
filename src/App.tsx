import './App.css'  
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Plan from './pages/Plan';
import Options from './pages/Options';
import Moments from './pages/Moments';
import Message from './pages/Message';
import Journey from './pages/Journey';
import Compliments from './pages/Compliments';
import { PrimeReactProvider } from 'primereact/api';
        

function App() {

  return (
    <>
      <PrimeReactProvider>
        <div>
          <HashRouter>
            <Routes>
              <Route path='/' element={<Landing />}></Route>
              <Route path='/message' element={<Message />}></Route>
              <Route path='/plan' element={<Plan />}></Route>
              <Route path='/options' element={<Options />}></Route>
              <Route path='/moments' element={<Moments />}></Route>
              <Route path='/journey' element={<Journey />}></Route>
              <Route path='/compliments' element={<Compliments />}></Route>
            </Routes>
          </HashRouter>
        </div>
      </PrimeReactProvider>
    </>
  )
}

export default App
