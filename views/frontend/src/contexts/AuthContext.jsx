"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/api/auth/profile")
      setCurrentUser(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Error fetching user profile:", error)
      logout() // Token might be invalid or expired
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setError(null)
    try {
      const response = await api.post("/api/auth/register", userData)
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed")
      throw error
    }
  }

  const login = async (credentials) => {
    setError(null)
    try {
      const response = await api.post("/api/auth/login", credentials)
      const { token } = response.data

      // Save token to localStorage
      localStorage.setItem("token", token)

      // Fetch user profile
      await fetchUserProfile()

      return response.data
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
      throw error
    }
  }

  const updateProfile = async (userData) => {
    setError(null)
    try {
      const response = await api.patch("/api/auth/profile", userData)
      setCurrentUser(response.data)
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed")
      throw error
    }
  }

  const deleteProfile = async () => {
    setError(null)
    try {
      await api.delete("/api/auth/profile")
      logout()
    } catch (error) {
      setError(error.response?.data?.message || "Profile deletion failed")
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    deleteProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

