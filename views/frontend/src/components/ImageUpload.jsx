import React, { useState } from 'react';

const MAX_FILE_SIZE = 100 * 1024; // 256KB in bytes

const ImageUpload = ({ onImageChange, initialImage = null }) => {
  const [previewUrl, setPreviewUrl] = useState(initialImage);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setError('');
    
    if (!file) return;
    
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      setError('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`Image size must be less than 100KB. Current size: ${(file.size / 1024).toFixed(2)}KB`);
      return;
    }
    
    try {
      // Convert to base64
      const base64String = await convertToBase64(file);
      setPreviewUrl(base64String);
      onImageChange(base64String);
    } catch (err) {
      setError('Failed to process the image');
      console.error(err);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="image-upload-container">
      <div className="form-group">
        <label htmlFor="product-image">Product Image (Max 100KB)</label>
        <input
          type="file"
          id="product-image"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleFileChange}
          className="file-input"
        />
        {error && <p className="error-text">{error}</p>}
      </div>
      
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="preview-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
