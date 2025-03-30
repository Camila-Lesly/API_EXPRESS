import axios from "axios"

// Create axios instance with base URL
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

const loginRoutes = [
  "/api/auth/login",
  "/api/auth/register",
]

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !loginRoutes.includes(error.config.url)) {
      // If the token is expired, remove it and redirect to login
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Product service functions
export const productService = {
  getAllProducts: () => api.get("/api/product"),

  getProductById: (id) => api.get(`/api/product/${id}`),

  createProduct: (productData) => api.post("/api/product", productData),

  updateProduct: (id, productData) => api.patch(`/api/product/${id}`, productData),

  deleteProduct: (id) => api.delete(`/api/product/${id}`),
}

