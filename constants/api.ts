export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://galizazapatista.org/api'
    : 'http://localhost:3000/api'
