import React, { useState, useEffect } from 'react'
import tmdbApi, { movieType, tvType } from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'

import './movie-catalog.scss'
import bg from '../../assets/hero.jpg'

export default function MovieCatalog({ category }) {
  const [items, setItems] = useState([])
  console.log(category)
  useEffect(() => {
    const getLists = async () => {
      const params = {}
      let res = null

      category === 'movie'
        ? (res = await tmdbApi.getMoviesList(movieType.upcoming, { params }))
        : (res = await tmdbApi.getTvList(tvType.popular, { params }))

      setItems(res.results)
    }
    getLists()
    //eslint-disable-next-line
  }, [category])
  console.log(items)
  return (
    <div className='movie-catalog section'>
      {items &&
        items.map((item, index) => <MovieCard key={index} item={item} />)}
    </div>
  )
}

export const HeaderCatalog = ({ children }) => {
  return (
    <div
      className='movie-catalog__title'
      style={{ backgroundImage: `url(${bg})` }}>
      <h2 className='title'>{children}</h2>
    </div>
  )
}
