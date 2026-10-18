export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
}
