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

      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
      <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input value={form.imageURL} onChange={e => setForm({ ...form, imageURL: e.target.value })} />

      <button type="submit">Update</button>
      <button type="button" onClick={deleteCreator}>Delete</button>
    </form>
  );
};

export default EditCreator;
