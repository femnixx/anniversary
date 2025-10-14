import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Compliments from './pages/Compliments';
import Journey from './pages/Journey';
import Landing from './pages/Landing';
import Message from './pages/Message';
import Moments from './pages/Moments';
import Options from './pages/Options';
import Plan from './pages/Plan';


function App() {
  
  return (
    <>
    {/* landing */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/message' element={<Message />}></Route>
        <Route path='/options' element={<Options />}></Route>
        <Route path='/compliments' element={<Compliments />}/>
        <Route path='/journey' element={<Journey />}/>
        <Route path='/moments' element={<Moments />}/>
        <Route path='/plan' element={<Plan />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

