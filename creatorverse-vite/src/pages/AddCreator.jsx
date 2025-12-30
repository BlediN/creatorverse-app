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

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="URL" onChange={e => setForm({ ...form, url: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Image URL" onChange={e => setForm({ ...form, imageURL: e.target.value })} />

      <button type="submit">Add</button>
    </form>
  );
};

export default AddCreator;
