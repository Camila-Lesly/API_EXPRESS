import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import ImageUpload from '../components/ImageUpload';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    // Add other product fields as needed
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  const handleImageChange = (base64Image) => {
    setFormData((prev) => ({
      ...prev,
      image: base64Image,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await productService.createProduct(formData);
      navigate(`/products/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create New Product</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <ImageUpload onImageChange={handleImageChange} />
        
        {/* Add other product fields as needed */}
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
