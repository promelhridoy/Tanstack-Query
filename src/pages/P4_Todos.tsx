import { useState } from 'react';
import { useAddTodo, useDeleteTodo, useTodos, useToggleTodo } from '../hooks/useTodos';

// Chapter 7, 8: useMutation + invalidateQueries (json-server লাগবে)
export default function P4_Todos() {
  const [title, setTitle] = useState('');
  const { data: todos, isLoading, isError, error, isFetching } = useTodos();
  const addMutation = useAddTodo();
  const deleteMutation = useDeleteTodo();
  const toggleMutation = useToggleTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addMutation.mutate(title.trim(), { onSuccess: () => setTitle('') });
  };

  if (isLoading) return <p>Loading todos...</p>;
  if (isError)
    return (
      <p className="error">
        Error: {error.message}. json-server চালু আছে? (`npm start` বা `npm run api`)
      </p>
    );

  return (
    <div>
      <h2>Todos {isFetching && <small className="muted">(syncing...)</small>}</h2>
      <div className="hint">Add / toggle / delete করো, আর Devtools-এ দেখো কখন ['todos'] refetch হয়। তারপর toggle-কে optimistic বানাও।</div>
      <form onSubmit={handleSubmit} className="row">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
      {addMutation.isError && <p className="error">{addMutation.error.message}</p>}
      {todos?.length === 0 && <p>No todos yet.</p>}
      <ul>
        {todos?.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleMutation.mutate(t)} />
            <span className={t.completed ? 'done' : ''}>{t.title}</span>{' '}
            <button onClick={() => deleteMutation.mutate(t.id)} disabled={deleteMutation.isPending}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
