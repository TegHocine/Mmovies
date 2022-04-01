import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header/Header'
import ConfigRoutes from './configRoutes/ConfigRoutes'

import './app.scss'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='*'
          element={
            <>
              <Header />
              <ConfigRoutes />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
