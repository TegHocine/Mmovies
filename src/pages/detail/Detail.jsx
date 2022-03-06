import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi'

import { ButtonsOutline } from '../../components/buttons/Buttons'

import './detail.scss'

export default function Detail() {
  const { id, category } = useParams()

  const [detail, setDetail] = useState(null)
  const [credits, setCredits] = useState(null)
  const [video, setVideo] = useState(null)
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

      const video = await tmdbApi.getVideos(category, id)
      setVideo(video.results.slice(0, 5))
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
              <p className='overview'> {detail.overview} </p>
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
    </>
  )
}
