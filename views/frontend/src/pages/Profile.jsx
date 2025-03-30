"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Profile = () => {
  const { currentUser, updateProfile, deleteProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    // Only validate passwords if they are provided (user wants to change password)
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    // Remove password fields if they are empty
    const updateData = { ...formData }
    if (!updateData.password) {
      delete updateData.password
      delete updateData.confirmPassword
    }

    setIsSubmitting(true)

    try {
      await updateProfile(updateData)
      setIsEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteProfile()
        navigate("/")
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete account")
      }
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error && <div className="error-message">{error}</div>}

      {!isEditing ? (
        <div className="profile-info">
          <div className="info-group">
            <label>First Name:</label>
            <p>{currentUser?.firstName}</p>
          </div>

          <div className="info-group">
            <label>Last Name:</label>
            <p>{currentUser?.lastName}</p>
          </div>

          <div className="info-group">
            <label>Email:</label>
            <p>{currentUser?.email}</p>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>

            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>

            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password (leave blank to keep current)</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile

