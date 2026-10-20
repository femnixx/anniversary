import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DynamicIsland, ScrollProgress } from './components/DynamicIsland';
import { RomanticBackground, FloatingHearts, Sparkles } from './components/RomanticBackground';
import './index.css';

import Landing from './pages/Landing';
import Message from './pages/Message';
import Options from './pages/Options';
import Reasons from './pages/Reasons';

const Memories = lazy(() => import('./pages/Memories'));
const Moments = lazy(() => import('./pages/Moments'));
const Journey = lazy(() => import('./pages/Journey'));
const Compliments = lazy(() => import('./pages/Compliments'));

function PageFallback() {
  return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-cream-50 border-2 border-rose-700 plate flex items-center justify-center text-4xl animate-heartbeat">
          💕
        </div>
        <p className="font-romantic-alt type-lead text-rose-700">loading our memories...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <HashRouter>
        <RomanticBackground />
        <FloatingHearts count={14} />
        <Sparkles count={18} />
        <ScrollProgress />
        <DynamicIsland />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path='/' element={<Landing />}></Route>
            <Route path='/message' element={<Message />}></Route>
            <Route path='/plan' element={<Navigate to="/memories" replace />} />
            <Route path='/memories' element={<Memories />}></Route>
            <Route path='/options' element={<Options />}></Route>
            <Route path='/moments' element={<Moments />}></Route>
            <Route path='/journey' element={<Journey />}></Route>
            <Route path='/compliments' element={<Compliments />}></Route>
            <Route path='/reasons' element={<Reasons />}></Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  )
}

export default App
