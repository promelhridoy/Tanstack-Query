import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsPage } from '../api/products';

// Chapter 12: useInfiniteQuery
export default function P6_Infinite() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam }) => fetchProductsPage(10, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const next = last.skip + last.limit;
      return next < last.total ? next : undefined;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="error">{error.message}</p>;

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <div>
      <h2>Infinite Query</h2>
      <div className="hint">চ্যালেঞ্জ: "Load more" বাটনের বদলে IntersectionObserver দিয়ে auto-load বানাও।</div>
      <ul>{products.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load more' : 'No more products'}
      </button>
    </div>
  );
}
