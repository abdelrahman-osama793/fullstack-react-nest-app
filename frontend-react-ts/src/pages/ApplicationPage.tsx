import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { getProfile } from '../api'

interface User {
  firstName: string
  lastName: string
  email: string
}

function ApplicationPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token') || ''
        const user = await getProfile(token);
        setUser(user)
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>
        setError(axiosError.response?.data?.message || 'Unauthorized, please sign in again.')
        localStorage.removeItem('token')
        setTimeout(() => navigate('/signin'), 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-md text-center">
        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Welcome to the application, {user?.firstName} {user?.lastName}!
            </h2>
            <p className="text-gray-600 mb-6">You are logged in as {user?.email}</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ApplicationPage
