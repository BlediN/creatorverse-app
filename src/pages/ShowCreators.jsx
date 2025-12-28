import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCreators, deleteCreator } from '../api/creators';
import Card from '../components/Card';
import './ShowCreators.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const data = await getAllCreators();
      setCreators(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching creators:', err);
      setError('Failed to load creators. Please check your Supabase configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCreator(id);
      setCreators(creators.filter(creator => creator.id !== id));
    } catch (err) {
      console.error('Error deleting creator:', err);
      alert('Failed to delete creator. Please try again.');
    }
  };

  if (loading) {
    return <div className="container loading">Loading creators...</div>;
  }

  if (error) {
    return (
      <div className="container error">
        <p>{error}</p>
        <p>Make sure you have created a .env file with your Supabase credentials.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Creatorverse</h1>
        <Link to="/add" className="btn btn-add">
          Add Creator
        </Link>
      </div>
      
      {creators.length === 0 ? (
        <div className="empty-state">
          <p>No creators found. Add your first creator!</p>
          <Link to="/add" className="btn btn-add">
            Add Creator
          </Link>
        </div>
      ) : (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card 
              key={creator.id} 
              creator={creator} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
