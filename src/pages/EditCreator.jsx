import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCreator, updateCreator } from '../api/creators';
import './CreatorForm.css';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCreator = async () => {
    try {
      setLoading(true);
      const data = await getCreator(id);
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || ''
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching creator:', err);
      setError('Failed to load creator.');
    } finally {
      setLoading(false);
    }
  };

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
      setSubmitting(true);
      setError(null);
      await updateCreator(id, formData);
      navigate(`/creator/${id}`);
    } catch (err) {
      console.error('Error updating creator:', err);
      setError('Failed to update creator. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container loading">Loading creator...</div>;
  }

  return (
    <div className="container">
      <Link to={`/creator/${id}`} className="btn btn-back">← Back to Creator</Link>
      
      <div className="form-container">
        <h1>Edit Creator</h1>
        
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
            <button type="submit" className="btn btn-submit" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Creator'}
            </button>
            <Link to={`/creator/${id}`} className="btn btn-cancel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCreator;
