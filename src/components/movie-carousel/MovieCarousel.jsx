import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Swiper, SwiperSlide } from 'swiper/react'

import tmdbApi from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'

import './movie-carousel.scss'

export default function MovieCarousel({ type, category, id }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getMovieLists = async () => {
      const params = {}
      let res = null

      if (type !== 'similar') {
        category === 'movie'
          ? (res = await tmdbApi.getMoviesList(type, { params }))
          : (res = await tmdbApi.getTvList(type, { params }))
      } else {
        res = await tmdbApi.similar(category, id)
      }

      setItems(res.results)
    }
    getMovieLists()
    //eslint-disable-next-line
  }, [])

  return (
    <div className='movie-list'>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items &&
          items.map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard item={item} category={category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

MovieCarousel.prototype = {
  type: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
}
