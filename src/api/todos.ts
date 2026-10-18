// json-server চালু থাকতে হবে: npm run api (বা npm start)
const BASE = 'http://localhost:3001/todos';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const getTodos = (): Promise<Todo[]> => fetch(BASE).then((r) => handle<Todo[]>(r));

export const addTodo = (title: string): Promise<Todo> =>
  fetch(BASE, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ title, completed: false }),
  }).then((r) => handle<Todo>(r));

export const toggleTodo = (todo: Todo): Promise<Todo> =>
  fetch(`${BASE}/${todo.id}`, {
    method: 'PATCH',
    headers: JSON_HEADERS,
    body: JSON.stringify({ completed: !todo.completed }),
  }).then((r) => handle<Todo>(r));

export const deleteTodo = (id: string): Promise<unknown> =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then((r) => handle(r));
