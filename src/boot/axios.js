import axios from 'axios'

const api = axios.create({
  baseURL: 'https://todo.kode.ch/api',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export { api }
