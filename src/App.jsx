import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import LoginSignup from './components/LoginSignup'
import authService from './API/authService'
import Home from './components/Home'
import BusinessAccount from './Pages/BusinessAccount'
import ForgotPassword from './components/ForgetPassword'
import UpdateProfile from './Pages/UpdateProfile'
import Settings from './Pages/Settings'


const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      setError(null)
      const response = await authService.login(credentials)
      if(response.token){
        localStorage.setItem('token', response.token)
        setIsAuthenticated(true)
        return response
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const signup = async (userData) => {
    try {
      setError(null)
      const response = await authService.signup(userData)
      if(response.token){
        localStorage.setItem('token', response.token)
        setIsAuthenticated(true)
        return response
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return(
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      signup,
      loading,
      error
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useAuth()
  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  return children
}

function App(){
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginSignup />} />
          <Route path='ForgotPassword' element={<ForgotPassword />} />
          <Route
          path='dashboard'
          element={
            <protectedRoute>
              <Dashboard />
            </protectedRoute>
          }
          />
          <Route
          path='UpdateProfile'
          element={
            <UpdateProfile />
          }
          />
          <Route 
          path='Settings'
          element={
            <Settings />
          }
          />
          <Route path='/Home' element={
              <Home />
          } />
          <Route path='/Home/businessAccount' element={
              <BusinessAccount />
          } />
          <Route path='/' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
export default App