import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ApplicationPage from './pages/ApplicationPage'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/app" /> : <Navigate to="/signin" />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/app" element={<ApplicationPage />} />
    </Routes>
  )
}

export default App
