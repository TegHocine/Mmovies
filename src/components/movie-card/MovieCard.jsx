import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { category } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import './movie-card.scss'

export default function MovieCard(props) {
  const item = props.item

  const link = '/' + category[props.category] + '/' + item.id

  const bg = apiConfig.w500Image(item.poster_path)

  return (
    <Link
      to={link}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }>
      <div
        className='movie-card'
        style={{ backgroundImage: `url(${bg})` }}></div>
      <h3 className='movie-card__title'>{item.title || item.name}</h3>
    </Link>
  )
}

MovieCard.prototype = {
  item: PropTypes.object,
  category: PropTypes.string,
}
