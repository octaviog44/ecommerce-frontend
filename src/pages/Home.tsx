
  import { useEffect } from 'react'
import { api } from '../api'

export default function Home() {
  useEffect(() => {
    api.get('/products').then(res => {
      console.log(res.data)
    })
  }, [])

  return <h1>Home</h1>
}
