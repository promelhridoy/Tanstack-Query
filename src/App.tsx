import { useState } from 'react';
import P1_Users from './pages/P1_Users';
import P2_UserDetails from './pages/P2_UserDetails';
import P3_Search from './pages/P3_Search';
import P4_Todos from './pages/P4_Todos';
import P5_Pagination from './pages/P5_Pagination';
import P6_Infinite from './pages/P6_Infinite';

const PAGES = [
  { label: '1. useQuery (Users)', Component: P1_Users },
  { label: '2. Dynamic + enabled', Component: P2_UserDetails },
  { label: '3. Search + debounce', Component: P3_Search },
  { label: '4. Mutation (Todos)', Component: P4_Todos },
  { label: '5. Pagination', Component: P5_Pagination },
  { label: '6. Infinite Query', Component: P6_Infinite },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const { Component } = PAGES[index];

  return (
    <div className="layout">
      <nav>
        <h1>TanStack Query Practice</h1>
        {PAGES.map((p, i) => (
          <button key={p.label} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}>
            {p.label}
          </button>
        ))}
      </nav>
      <main>
        <Component />
      </main>
    </div>
  );
}
