// import { useState } from 'react';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { fetchProductsPage } from '../api/products';

// const LIMIT = 10;

// // Chapter 12: pagination + keepPreviousData
// export default function P5_Pagination() {
//   const [page, setPage] = useState(1);
//   const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
//     queryKey: ['products', 'page', page],
//     queryFn: () => fetchProductsPage(LIMIT, (page - 1) * LIMIT),
//     placeholderData: keepPreviousData,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p className="error">{error.message}</p>;

//   const totalPages = Math.ceil((data?.total ?? 0) / LIMIT);

//   return (
//     <div>
//       <h2>Pagination</h2>
//       <div className="hint">placeholderData সরিয়ে দিয়ে দেখো পেজ বদলালে কী হয়।</div>
//       <ul style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
//         {data?.products.map((p) => <li key={p.id}>{p.title}</li>)}
//       </ul>
//       <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
//       <span>Page {page} / {totalPages}</span>
//       <button onClick={() => setPage((p) => p + 1)} disabled={isPlaceholderData || page >= totalPages}>Next</button>
//     </div>
//   );
// }

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsPage } from '../api/products';

const LIMIT = 10;

// Chapter 12: Pagination WITHOUT keepPreviousData (For practice)
export default function P5_Pagination_Without_Placeholder() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', 'page', page],
    queryFn: () => fetchProductsPage(LIMIT, (page - 1) * LIMIT),
    // keepPreviousData সরিয়ে দেওয়া হলো!
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="error">{error.message}</p>;

  const totalPages = Math.ceil((data?.total ?? 0) / LIMIT);

  return (
    <div>
      <h2>Pagination (Without keepPreviousData)</h2>
      <div className="hint">Next বাটন চেপে দেখো পেজ বদলালে কী হয়!</div>
      <ul>
        {data?.products.map((p) => <li key={p.id}>{p.title}</li>)}
      </ul>
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
      <span>Page {page} / {totalPages}</span>
      <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
