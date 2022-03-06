import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/detail/Detail'

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path=':category' element={<Catalog />} />
      <Route path=':category/search/:keyword' element={<Catalog />} />
      <Route path=':category/:id' element={<Detail />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}
