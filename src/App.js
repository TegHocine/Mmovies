import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header/Header'
import ConfigRoutes from './configRoutes/ConfigRoutes'
import Footer from './components/footer/Footer'

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
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
