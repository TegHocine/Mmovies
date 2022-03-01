const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '35cb1e8e3948b911e6f265973bf5e812',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig
