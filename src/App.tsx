import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Message from './pages/Message';
function App() {
  
  return (
    <>
    {/* landing */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/message' element={<Message />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

