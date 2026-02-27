import { useState, useEffect } from 'react'
import { useAuth, API_BASE } from '../context/AuthContext'

export function useApi(endpoint) {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!endpoint) return
    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      try {
        const headers = { 'Content-Type': 'application/json' }
        if (user?.token) headers['Authorization'] = `Bearer ${user.token}`

        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers,
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [endpoint, user?.token])

  return { data, loading, error, refetch: () => {} }
}