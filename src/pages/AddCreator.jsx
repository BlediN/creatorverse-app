import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCreator } from '../api/creators';
import './CreatorForm.css';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createCreator(formData);
      navigate('/');
    } catch (err) {
      console.error('Error creating creator:', err);
      setError('Failed to create creator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="btn btn-back">← Back to All Creators</Link>
      
      <div className="form-container">
        <h1>Add New Creator</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter creator name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Channel URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://youtube.com/@creator"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about this creator..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">Image URL</label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.imageURL && (
              <div className="image-preview">
                <img src={formData.imageURL} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Creator'}
            </button>
            <Link to="/" className="btn btn-cancel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;
