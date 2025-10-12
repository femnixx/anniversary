import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Message from './pages/Message';
import Options from './pages/Options';
import Compliments from './pages/Compliments';
import Journey from './pages/Journey';
import Moments from './pages/Moments';
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
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

