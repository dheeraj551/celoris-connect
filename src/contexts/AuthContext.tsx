import React, { createContext, useContext, useEffect, useState } from 'react'
import { account } from '@/lib/appwrite'
import type { User } from 'appwrite'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role?: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkCurrentUser()
    
    // Listen for auth changes
    account.get()
      .then((response) => {
        setUser(response)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })

    // Subscribe to auth state changes
    const unsubscribe = account.onChange((event) => {
      if (event.event === 'sign-in') {
        setUser(event.user)
      } else if (event.event === 'sign-out') {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const checkCurrentUser = async () => {
    try {
      const currentUser = await account.get()
      setUser(currentUser)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await account.createEmailSession(email, password)
      
      // Check user role in preferences
      const userPrefs = response.user.prefs || {}
      const userRole = userPrefs.role || 'tutor'
      
      // Update user preferences if role is missing
      if (!userPrefs.role) {
        await account.updatePrefs({ role: userRole })
      }
      
      toast.success('Login successful!')
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'Login failed')
      throw error
    }
  }

  const register = async (email: string, password: string, name: string, role: string = 'tutor') => {
    try {
      const user = await account.create('unique()', email, password, name)
      
      // Set user role in preferences
      await account.updatePrefs({ role, name })
      
      // Send email verification  
      await account.createVerification(`${window.location.origin}/auth/callback`)
      
      toast.success('Registration successful! Please check your email to verify your account.')
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed')
      throw error
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser(null)
      toast.success('Logged out successfully')
    } catch (error: any) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
      throw error
    }
  }

  const updateProfile = async (updates: any) => {
    try {
      const updatedUser = await account.updatePrefs(updates)
      setUser(updatedUser)
      toast.success('Profile updated successfully')
    } catch (error: any) {
      console.error('Profile update error:', error)
      toast.error(error.message || 'Failed to update profile')
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}