// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchProductsPage } from '../api/products';

// // Chapter 12: useInfiniteQuery
// export default function P6_Infinite() {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
//     queryKey: ['products', 'infinite'],
//     queryFn: ({ pageParam }) => fetchProductsPage(10, pageParam),
//     initialPageParam: 0,
//     getNextPageParam: (last) => {
//       const next = last.skip + last.limit;
//       return next < last.total ? next : undefined;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p className="error">{error.message}</p>;

//   const products = data?.pages.flatMap((p) => p.products) ?? [];

//   return (
//     <div>
//       <h2>Infinite Query</h2>
//       <div className="hint">চ্যালেঞ্জ: "Load more" বাটনের বদলে IntersectionObserver দিয়ে auto-load বানাও।</div>
//       <ul>{products.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
//       <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
//         {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load more' : 'No more products'}
//       </button>
//     </div>
//   );
// }


import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsPage } from '../api/products';

// Chapter 12: useInfiniteQuery + IntersectionObserver
export default function P6_Infinite() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam }) => fetchProductsPage(10, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const next = last.skip + last.limit;
      return next < last.total ? next : undefined;
    },
  });

  // IntersectionObserver সেটআপ
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="error">{error.message}</p>;

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <div>
      <h2>Infinite Query (IntersectionObserver)</h2>
      <div className="hint">নিচে স্ক্রোল করলেই অটোমেটিক পরের প্রোডাক্টগুলো লোড হবে!</div>
      
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            {p.title}
          </li>
        ))}
      </ul>

      {/* বাটনের বদলে এই ট্রিগার ডিভটি স্ক্রিনের নিচে ভিউপোর্টে আসলে অটো কল হবে */}
      <div ref={loadMoreRef} style={{ padding: '20px', textAlign: 'center' }}>
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <p className="muted">Scroll down for more...</p>
        ) : (
          <p>No more products</p>
        )}
      </div>
    </div>
  );
}