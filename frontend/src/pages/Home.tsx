import { useState, useEffect } from 'react'
import { api } from '../services/api'

function Home() {
  const [message, setMessage] = useState<string>('')
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [helloRes, healthRes] = await Promise.all([
        api.get('/'),
        api.get('/health')
      ])
      setMessage(helloRes.data)
      setHealth(healthRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div>
      <h1>Welcome to Full Stack App</h1>
      <div className="card">
        <h2>Backend Response</h2>
        <p>{message}</p>
      </div>
      
      {health && (
        <div className="card">
          <h2>Health Check</h2>
          <p>Status: {health.status}</p>
          <p>Database: {health.database}</p>
          <p>Timestamp: {new Date(health.timestamp).toLocaleString()}</p>
        </div>
      )}

      <div className="card">
        <h2>Tech Stack</h2>
        <ul style={{ textAlign: 'left' }}>
          <li>Frontend: React + TypeScript + Vite</li>
          <li>Backend: NestJS + TypeScript</li>
          <li>Database: Microsoft SQL Server</li>
          <li>ORM: TypeORM</li>
          <li>Containerization: Docker</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
