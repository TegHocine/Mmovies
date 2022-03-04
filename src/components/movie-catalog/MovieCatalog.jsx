import React, { useState, useEffect } from 'react'
import tmdbApi, { movieType, tvType } from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'
import { ButtonsOutline } from '../buttons/Buttons'

import './movie-catalog.scss'
import bg from '../../assets/hero.jpg'

export default function MovieCatalog({ category }) {
  const [items, setItems] = useState([])
  const [pageNbr, setPageNbr] = useState(1)

  useEffect(() => {
    const getLists = async () => {
      const params = { page: pageNbr }
      let res = null

      category === 'movie'
        ? (res = await tmdbApi.getMoviesList(movieType.upcoming, { params }))
        : (res = await tmdbApi.getTvList(tvType.popular, { params }))

      setItems(res.results)
    }
    getLists()
    //eslint-disable-next-line
  }, [category])

  const loadMore = async () => {
    const params = { page: pageNbr + 1 }
    let res = null

    category === 'movie'
      ? (res = await tmdbApi.getMoviesList(movieType.upcoming, { params }))
      : (res = await tmdbApi.getTvList(tvType.popular, { params }))

    setItems([...items, ...res.results])
    setPageNbr(pageNbr + 1)
  }
  return (
    <>
      <div className='movie-catalog section'>
        {items &&
          items.map((item, index) => <MovieCard key={index} item={item} />)}
        <ButtonsOutline
          className={'movie-catalog__loadmore small'}
          onClick={loadMore}>
          Load more
        </ButtonsOutline>
      </div>
    </>
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
