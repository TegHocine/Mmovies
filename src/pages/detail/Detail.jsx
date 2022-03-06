import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi'

import MovieCarousel from '../../components/movie-carousel/MovieCarousel'
import { ButtonsOutline } from '../../components/buttons/Buttons'

import './detail.scss'

export default function Detail() {
  const { id, category } = useParams()

  const [detail, setDetail] = useState(null)
  const [credits, setCredits] = useState(null)
  const [videos, setVideos] = useState(null)
  const [bg, setBg] = useState({ origin: null, w500: null })

  useEffect(() => {
    const getDetails = async () => {
      const detail = await tmdbApi.detail(category, id, { params: {} })
      setDetail(detail)
      setBg({
        origin: apiConfig.originalImage(
          detail.backdrop_path || detail.poster_path,
        ),
        w500: apiConfig.w500Image(detail.poster_path),
      })

      const credits = await tmdbApi.credits(category, id)
      setCredits(credits.cast.slice(0, 5))

      const videos = await tmdbApi.getVideos(category, id)
      setVideos(videos.results.slice(0, 3))
    }
    getDetails()
  }, [category, id])

  return (
    <>
      {detail && (
        <div
          className='detail-hero'
          style={{ backgroundImage: `url(${bg.origin})` }}>
          <div className='detail-hero__content container'>
            <div className='detail-hero__content__poster'>
              <img src={bg.w500} alt='' />
            </div>
            <div className='detail-hero__content__info'>
              <h1 className='title'>{detail.title || detail.name}</h1>
              <div className='genres'>
                {detail.genres.map((genre, index) => (
                  <ButtonsOutline key={index} className='btns small'>
                    {genre.name}
                  </ButtonsOutline>
                ))}
              </div>

              {/* overview */}
              <p className='overview'> {detail.overview} </p>

              {/* cast  */}
              <div className='cast'>
                {credits &&
                  credits.map((cast, index) => (
                    <div key={index} className='casts__item'>
                      <div
                        className='casts__item__img'
                        style={{
                          backgroundImage: `url(${apiConfig.w500Image(
                            cast.profile_path,
                          )})`,
                        }}></div>
                      <p className='casts__item__name'>{cast.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* embed videos */}
      <div className='detail-video-container container'>
        {videos &&
          videos.map((video, index) => <Video key={index} item={video} />)}
      </div>

      {/* similar carousel */}
      <div className='detail-similar container'>
        <h2 style={{ marginBottom: '0.5rem' }}>Similar</h2>
        <MovieCarousel type='similar' id={id} category={category} />
      </div>
    </>
  )
}

const Video = (props) => {
  const item = props.item

  const iframeRef = useRef(null)

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
    iframeRef.current.setAttribute('height', height)
  }, [])

  return (
    <div className='detail-video'>
      <div className='detail-video__title'>
        <h2>{item.name}</h2>
      </div>
      <div className='detail-video__iframe'>
        <iframe
          src={`https://www.youtube.com/embed/${item.key}`}
          ref={iframeRef}
          width='100%'
          title='video'></iframe>
      </div>
    </div>
  )
}
