import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      setForm(data);
    };

    fetchCreator();
  }, [id]);

  const updateCreator = async (e) => {
    e.preventDefault();

    await supabase
      .from('creators')
      .update(form)
      .eq('id', id);

    navigate('/');
  };

  const deleteCreator = async () => {
    await supabase.from('creators').delete().eq('id', id);
    navigate('/');
  };

  return (
    <form onSubmit={updateCreator}>
      <h2>Edit Creator</h2>

      <div className="floating-field">
        <input
          id="name"
          placeholder=" "
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label htmlFor="name">Name*</label>
      </div>

      <div className="floating-field">
        <input
          id="url"
          placeholder=" "
          required
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <label htmlFor="url">Channel URL*</label>
      </div>

      <div className="floating-field">
        <textarea
          id="description"
          placeholder=" "
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label htmlFor="description">Description*</label>
      </div>

      <div className="floating-field">
        <input
          id="imageURL"
          placeholder=" "
          value={form.imageURL}
          onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
        />
        <label htmlFor="imageURL">Image URL (optional)</label>
      </div>

      <button type="submit">Update</button>
      <button type="button" className="secondary" onClick={() => navigate(-1)}>Cancel</button>
      <button type="button" onClick={deleteCreator}>Delete</button>
    </form>
  );
};

export default EditCreator;
