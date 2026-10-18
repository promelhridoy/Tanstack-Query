import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/users';

// Chapter 5, 6: dynamic query + enabled
function UserDetails({ userId }: { userId?: number }) {
  const { data: user, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
  });

  if (!userId) return <p>একজন user select করো</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p className="error">{error.message}</p>;

  return (
    <div>
      <h3>{user?.name} {isFetching && <span className="muted">(updating...)</span>}</h3>
      <p>{user?.email}</p>
      <p>{user?.phone}</p>
    </div>
  );
}

export default function P2_UserDetails() {
  const [selectedId, setSelectedId] = useState<number | undefined>();

  return (
    <div>
      <h2>Dynamic Query + enabled</h2>
      <div className="hint">User 1 → 2 → আবার 1 চাপো। দ্বিতীয়বার instant আসে কেন? Devtools-এ দেখো। 99 দিয়ে error-ও টেস্ট করো।</div>
      <div className="row">
        {[1, 2, 3, 4, 5, 99].map((id) => (
          <button key={id} onClick={() => setSelectedId(id)}>User {id}</button>
        ))}
      </div>
      <UserDetails userId={selectedId} />
    </div>
  );
}
