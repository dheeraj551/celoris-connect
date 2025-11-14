import { useAuth as useAuthContext } from '@/contexts/AuthContext'

export function useAuth() {
  const authContext = useAuthContext()
  
  // Helper function to check if user has admin role
  const isAdmin = () => {
    return authContext.user?.prefs?.role === 'admin'
  }
  
  // Helper function to check if user has tutor role
  const isTutor = () => {
    return authContext.user?.prefs?.role === 'tutor'
  }
  
  // Helper function to get user role
  const getUserRole = () => {
    return authContext.user?.prefs?.role || 'tutor'
  }
  
  // Helper function to get user name
  const getUserName = () => {
    return authContext.user?.name || 'User'
  }
  
  // Helper function to get user email
  const getUserEmail = () => {
    return authContext.user?.email || ''
  }
  
  return {
    ...authContext,
    isAdmin,
    isTutor,
    getUserRole,
    getUserName,
    getUserEmail,
  }
}