import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/auth/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import TutorDashboard from './pages/tutor/TutorDashboard'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { useAuth } from './hooks/useAuth'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  
  if (!user) return <Navigate to="/login" replace />
  
  const userRole = user.prefs?.role || 'tutor'
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/tutor'} replace />
  }
  
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Tutor Routes */}
      <Route 
        path="/tutor/*" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'tutor']}>
            <TutorDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Root Route - Redirect based on role */}
      <Route 
        path="/" 
        element={<RootRedirect />} 
      />
    </Routes>
  )
}

function RootRedirect() {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  
  if (!user) return <Navigate to="/login" replace />
  
  const userRole = user.prefs?.role || 'tutor'
  return <Navigate to={userRole === 'admin' ? '/admin' : '/tutor'} replace />
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App