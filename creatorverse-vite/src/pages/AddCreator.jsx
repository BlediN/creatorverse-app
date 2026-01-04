import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from('creators').insert(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Creator</h2>

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
          required
          placeholder=" "
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <label htmlFor="url">Channel URL*</label>
      </div>

      <div className="floating-field">
        <textarea
          id="description"
          required
          placeholder=" "
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

      <button type="submit">Add Creator</button>
      <button type="button" className="secondary" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
};

export default AddCreator;
