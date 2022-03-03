import React, { useState, useEffect, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'

import Buttons, { ButtonsOutline } from '../buttons/Buttons'
import Modal from '../modal/Modal'

import ApiConfig from '../../api/apiConfig'
import TmdbApi, { movieType, category } from '../../api/tmdbApi'

import 'swiper/css'
import './hero-slide.scss'
import tmdbApi from '../../api/tmdbApi'

export default function HeroSlide() {
  SwiperCore.use([Autoplay])
  const [movieItems, setMovieItems] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      const res = await TmdbApi.getMoviesList(movieType.popular, {
        params,
      })
      setMovieItems(res.results.slice(1, 4))
      try {
      } catch (err) {
        console.log(err)
      }
    }
    getMovies()
    //eslint-disable-next-line
  }, [])

  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}>
        {movieItems &&
          movieItems.map((movieItem, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <HeroSlideItem
                  item={movieItem}
                  className={`${isActive ? 'active' : ''}`}
                />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
      {movieItems &&
        movieItems.map((movieItem, index) => (
          <HeroSlideModal key={index} item={movieItem} />
        ))}
    </div>
  )
}

const HeroSlideItem = ({ item, className }) => {
  const bg = ApiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path,
  )

  const poster = ApiConfig.w500Image(item.poster_path)

  const setModal = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)

    const video = await tmdbApi.getVideos(category.movie, item.id)

    if (video.results.length > 0) {
      const vidSrc = 'https://www.youtube.com/embed/' + video.results[0].key

      modal
        .querySelector('.modal__wrap__content > iframe')
        .setAttribute('src', vidSrc)
    } else {
      modal.querySelector('.modal__wrap__content').innerHTML = 'No trailer'
    }

    modal.classList.toggle('active')
  }
  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{
        backgroundImage: `url(${bg})`,
      }}>
      <div className='hero-slide__item__content container'>
        <div className='hero-slide__item__content__info'>
          <h2 className='title'> {item.title} </h2>
          <div className='overview'> {item.overview} </div>
          <div className='btns'>
            <Buttons>Watch now</Buttons>
            <ButtonsOutline onClick={setModal}>Watch trailer</ButtonsOutline>
          </div>
        </div>
        <div className='hero-slide__item__content__poster'>
          <img src={poster} alt='poster' />
        </div>
      </div>
    </div>
  )
}

const HeroSlideModal = ({ item }) => {
  const bg = ApiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path,
  )
  const iframeRef = useRef()

  const onClose = () => iframeRef.current.setAttribute('src', '')

  return (
    <Modal active={false} id={`modal_${item.id}`} onClose={onClose} bg={bg}>
      <iframe
        ref={iframeRef}
        width='100%'
        height='100%'
        title='trailer'
        style={{ border: 'transparent', borderRadius: '30px' }}></iframe>
    </Modal>
  )
}
