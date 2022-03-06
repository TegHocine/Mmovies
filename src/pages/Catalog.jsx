import React from 'react'
import { useParams } from 'react-router-dom'

import { category as cate } from '../api/tmdbApi'

import MovieCatalog, {
  HeaderCatalog,
} from '../components/movie-catalog/MovieCatalog'

export default function Catalog() {
  const { category } = useParams()
  return (
    <>
      <HeaderCatalog>
        {category === cate.movie ? 'Movies' : 'TV Shows'}
      </HeaderCatalog>
      <div className='container'>
        <MovieCatalog category={category} />
      </div>
    </>
  )
}
