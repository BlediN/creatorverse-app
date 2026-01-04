import { useEffect, useState } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase.from('creators').select('*');
      setCreators(data || []);
    };

    fetchCreators();
  }, []);

  return (
    <section className="creators-section">
      <h1>✨ Creatorverse</h1>

      {creators.length === 0 ? (
        <p>No creators yet. Add one!</p>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ShowCreators;
