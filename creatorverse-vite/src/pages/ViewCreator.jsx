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
    <div>
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank">Visit Channel</a>

      <br />
      <Link to={`/edit/${id}`}>Edit</Link>
    </div>
  );
};

export default ViewCreator;
