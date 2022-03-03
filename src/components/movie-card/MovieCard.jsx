import React from 'react'
import { Link } from 'react-router-dom'

import Buttons from '../buttons/Buttons'

import { category } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './movie-card.scss'

export default function MovieCard(props) {
  const item = props.item
  const link = '/' + category[props.category] + '/' + item.id
  const bg = apiConfig.w500Image(item.poster_path)
  return (
    <Link to={link}>
      <div className='movie-card' style={{ backgroundImage: `url(${bg})` }}>
        <Buttons className='movie-card__button '>
          <div className='playBtn'></div>
        </Buttons>
      </div>
      <h3 className='movie-card__title'>{item.title || item.name}</h3>
    </Link>
  )
}
