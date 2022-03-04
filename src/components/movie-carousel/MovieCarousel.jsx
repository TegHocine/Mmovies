import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import tmdbApi from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'

import './movie-carousel.scss'

export default function MovieCarousel(props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getMovieLists = async () => {
      const params = {}
      let res = null
      if (props.type !== 'similar') {
        if (props.category === 'movie') {
          res = await tmdbApi.getMoviesList(props.type, { params })
        }
        res = await tmdbApi.getTvList(props.type, { params })
      } else {
        res = await tmdbApi.similar(props.type, { params })
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
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
