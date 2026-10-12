import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { DynamicIsland, ScrollProgress } from './components/DynamicIsland';
import { RomanticBackground, FloatingHearts, Sparkles } from './components/RomanticBackground';
import './index.css';

import Landing from './pages/Landing';
import Message from './pages/Message';
import Options from './pages/Options';

const Plan = lazy(() => import('./pages/Plan'));
const Moments = lazy(() => import('./pages/Moments'));
const Journey = lazy(() => import('./pages/Journey'));
const Compliments = lazy(() => import('./pages/Compliments'));

function PageFallback() {
  return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl glass-rose border border-rose-200/50 flex items-center justify-center text-4xl animate-heartbeat">
          💕
        </div>
        <p className="font-romantic-alt type-lead text-rose-600">loading our memories...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <PrimeReactProvider>
        <HashRouter>
          <RomanticBackground />
          <FloatingHearts count={15} />
          <Sparkles count={25} />
          <ScrollProgress />
          <DynamicIsland />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path='/' element={<Landing />}></Route>
              <Route path='/message' element={<Message />}></Route>
              <Route path='/plan' element={<Plan />}></Route>
              <Route path='/options' element={<Options />}></Route>
              <Route path='/moments' element={<Moments />}></Route>
              <Route path='/journey' element={<Journey />}></Route>
              <Route path='/compliments' element={<Compliments />}></Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </PrimeReactProvider>
    </>
  )
}

export default App