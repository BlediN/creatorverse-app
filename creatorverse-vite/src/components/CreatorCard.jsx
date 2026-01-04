import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
  return (
    <div className="creator-card">
      <article>
          <div className="card-image">
            <img
              src={creator.imageURL}
              alt={creator.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
              }}
            />
          </div>

        <h3>{creator.name}</h3>
        <p className="description">{creator.description}</p>

        <a
          href={creator.url}
          target="_blank"
          role="button"
          className="secondary"
        >
          Visit Channel
        </a>

        <footer>
          <Link to={`/view/${creator.id}`}>View</Link>
          {' | '}
          <Link to={`/edit/${creator.id}`}>Edit</Link>
        </footer>
      </article>
    </div>
  );
};

export default CreatorCard;
