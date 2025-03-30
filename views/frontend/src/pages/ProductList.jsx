import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Products</h2>
        {isAuthenticated && (
          <Link to="/products/create" className="btn btn-primary">
            Add New Product
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {product.image && (
                <div className="product-card-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                </div>
              )}
              <div className="product-card-content">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">€{product.price}</p>
                <div className="product-actions">
                  <Link to={`/products/${product._id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
