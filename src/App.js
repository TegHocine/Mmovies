import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ConfigRoutes from './configRoutes/ConfigRoutes'

import './app.scss'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<ConfigRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
