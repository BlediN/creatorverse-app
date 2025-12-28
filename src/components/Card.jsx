import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ creator, onDelete }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      await onDelete(creator.id);
    }
  };

  return (
    <div className="card-creator">
      {creator.imageURL && (
        <div className="card-image">
          <img src={creator.imageURL} alt={creator.name} />
        </div>
      )}
      <div className="card-content">
        <h3>{creator.name}</h3>
        <p className="card-description">{creator.description}</p>
        <div className="card-actions">
          <Link to={`/creator/${creator.id}`} className="btn btn-view">
            View
          </Link>
          <Link to={`/edit/${creator.id}`} className="btn btn-edit">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete
          </button>
          {creator.url && (
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-link"
            >
              Visit Channel
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
