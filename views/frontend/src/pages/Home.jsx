"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Our Product Management System</h1>
        <p>Browse our products or manage your own products with our easy-to-use platform.</p>

        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline">
                Register
              </Link>
            </>
          ) : (
            <Link to="/products/create" className="btn btn-secondary">
              Create Product
            </Link>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Product Management</h3>
            <p>Create, view, update, and delete your products with ease.</p>
          </div>

          <div className="feature-card">
            <h3>User Profiles</h3>
            <p>Manage your personal information and track your products.</p>
          </div>

          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>Your data is protected with our secure authentication system.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

