import axios from 'axios'

const API = axios.create({
  baseURL: 'https://labtest-cyan.vercel.app/api'
})

API.interceptors.request.use(

  (config) => {

    const userInfo = localStorage.getItem('user')

    if (userInfo) {

      const token = JSON.parse(userInfo).token

      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => {

    return Promise.reject(error)
  }
)

export default API