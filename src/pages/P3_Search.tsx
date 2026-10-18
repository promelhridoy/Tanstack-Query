import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../api/products';
import { useDebounce } from '../hooks/useDebounce';

// Chapter 6: enabled + debounce
export default function P3_Search() {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 500);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products', 'search', debounced],
    queryFn: () => searchProducts(debounced),
    enabled: debounced.length >= 3,
  });

  return (
    <div>
      <h2>Search (enabled + debounce)</h2>
      <div className="hint">কমপক্ষে ৩ অক্ষর লিখলে তবেই call যাবে। Network tab খুলে দেখো। চেষ্টা করো: phone, laptop</div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
      {search.length > 0 && search.length < 3 && <p className="muted">Type at least 3 characters...</p>}
      {isLoading && <p>Searching...</p>}
      {isFetching && !isLoading && <p className="muted">Updating...</p>}
      <ul>{data?.products.map((p) => <li key={p.id}>{p.title} — ${p.price}</li>)}</ul>
    </div>
  );
}

// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { searchProducts } from '../api/products';

// // Chapter 6: Search WITHOUT debounce
// export default function P3_Search_Without_Debounce() {
//   const [search, setSearch] = useState('');

//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ['products', 'search', search],
//     queryFn: () => searchProducts(search),
//     enabled: search.length >= 3,
//   });

//   return (
//     <div>
//       <h2>Search (Without Debounce)</h2>
//       <div className="hint">কমপক্ষে ৩ অক্ষর লিখলে ইনপুটের প্রতি অক্ষরের জন্য আলাদা call যাবে। Network tab খুলে পরীক্ষা করো।</div>
//       <input 
//         value={search} 
//         onChange={(e) => setSearch(e.target.value)} 
//         placeholder="Search products" 
//       />
//       {search.length > 0 && search.length < 3 && <p className="muted">Type at least 3 characters...</p>}
//       {isLoading && <p>Searching...</p>}
//       {isFetching && !isLoading && <p className="muted">Updating...</p>}
//       <ul>
//         {data?.products.map((p: any) => (
//           <li key={p.id}>{p.title} — ${p.price}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }