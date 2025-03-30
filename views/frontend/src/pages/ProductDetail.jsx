import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductById(id);
      setProduct(response.data);
    } catch (err) {
      setError('Failed to fetch product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        navigate('/products');
      } catch (err) {
        setError('Failed to delete product');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  // Check if the current user is the owner of the product
  const isOwner = currentUser && product.owner === currentUser._id;

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h2>{product.name}</h2>
        <div className="product-actions">
          <Link to="/products" className="btn btn-secondary">
            Back to Products
          </Link>
          
          {isAuthenticated && isOwner && (
            <>
              <Link to={`/products/${id}/edit`} className="btn btn-primary">
                Edit Product
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete Product
              </button>
            </>
          )}
        </div>
      </div>

      <div className="product-detail-content">
        {product.image && (
          <div className="product-image-container">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
          </div>
        )}
        
        <div className="product-info">
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
          {/* Add more product details as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
