import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      setCreator(data);
    };

    fetchCreator();
  }, [id]);

  if (!creator) return <p>Loading...</p>;

  return (
    <section className="view-creator">
      <h2>{creator.name}</h2>

      {/* ✅ IMAGE */}
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="view-creator-image"
        />
      )}

      <p>{creator.description}</p>

      <a
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        className="secondary"
      >
        Visit Channel
      </a>

      <br /><br />

      <Link to={`/edit/${creator.id}`}>Edit</Link>
      {' | '}
      <Link to="/">Back</Link>
    </section>
  );
};

export default ViewCreator;
