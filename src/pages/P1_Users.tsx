import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';

// Chapter 2, 3, 4: useQuery, queryKey, loading/error state
export default function P1_Users() {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="error">Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <div className="hint">চেষ্টা করো: Devtools খোলো, অন্য tab-এ গিয়ে ফিরে এসো। staleTime বদলে পার্থক্য দেখো।</div>
      <button onClick={() => refetch()}>{isFetching ? 'Refreshing...' : 'Refetch'}</button>
      <ul>
        {data?.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
