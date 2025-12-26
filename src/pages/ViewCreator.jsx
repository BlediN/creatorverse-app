import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCreator, deleteCreator } from '../api/creators';
import './ViewCreator.css';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCreator = async () => {
    try {
      setLoading(true);
      const data = await getCreator(id);
      setCreator(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching creator:', err);
      setError('Failed to load creator.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      try {
        await deleteCreator(id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting creator:', err);
        alert('Failed to delete creator. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="container loading">Loading creator...</div>;
  }

  if (error || !creator) {
    return (
      <div className="container error">
        <p>{error || 'Creator not found'}</p>
        <Link to="/" className="btn btn-back">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-back">← Back to All Creators</Link>
      
      <div className="creator-detail">
        {creator.imageURL && (
          <div className="creator-image">
            <img src={creator.imageURL} alt={creator.name} />
          </div>
        )}
        
        <div className="creator-info">
          <h1>{creator.name}</h1>
          <p className="creator-description">{creator.description}</p>
          
          {creator.url && (
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-visit"
            >
              Visit Channel
            </a>
          )}
          
          <div className="creator-actions">
            <Link to={`/edit/${creator.id}`} className="btn btn-edit">
              Edit Creator
            </Link>
            <button onClick={handleDelete} className="btn btn-delete">
              Delete Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
