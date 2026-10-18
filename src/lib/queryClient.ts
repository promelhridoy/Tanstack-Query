import { QueryClient } from '@tanstack/react-query';

// Component-এর বাইরে বানানো হয়েছে (গুরুত্বপূর্ণ!)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,            // শেখার সময় 0 রাখো, তারপর বাড়িয়ে পরীক্ষা করো (যেমন 1000 * 30)
      gcTime: 1000 * 60 * 5,
      retry: false,            // error দ্রুত দেখার জন্য; real project-এ 1-3 দাও
      refetchOnWindowFocus: true,
    },
  },
});
