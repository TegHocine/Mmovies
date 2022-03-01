import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/Detail'

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path=':category' element={<Catalog />}>
        <Route path='search/:keyword' element={<Catalog />} />
        <Route path=':id' element={<Detail />} />
      </Route>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}
