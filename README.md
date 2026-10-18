# TanStack Query Practice Project

React + TypeScript + Vite + TanStack Query v5 (+ json-server for fake backend).

## চালানোর নিয়ম

```bash
npm install
npm start          # Vite (http://localhost:5173) + json-server (http://localhost:3001) একসাথে
```

আলাদা আলাদা চালাতে চাইলে: `npm run dev` ও `npm run api`

Devtools: browser-এর নিচে ডান কোণে ছোট ফুলের আইকনে ক্লিক করো।

## ফোল্ডার

```
db.json              # json-server-এর database (todos)
src/lib/queryClient.ts   # QueryClient + global default options
src/main.tsx             # Provider + Devtools
src/api/                 # শুধু fetch function
src/hooks/               # custom hooks (useTodos, useDebounce)
src/pages/               # ৬টি practice page (App.tsx-এর sidebar থেকে খোলে)
```

## Practice Tasks

**১. useQuery / queryKey / states (P1)**
- [ ] URL ভুল করে error UI টেস্ট করো (`/userz`)
- [ ] `queryClient.ts`-এ `retry: false` সরিয়ে error আসতে কত সময় লাগে দেখো
- [ ] `staleTime` ০ থেকে ৩০ সেকেন্ড করো; tab বদলে Network tab-এ পার্থক্য দেখো

**২. Dynamic + enabled (P2, P3)**
- [ ] User 1 → 2 → 1 চাপো; Devtools-এ দুটো আলাদা key দেখো
- [ ] `enabled` সরিয়ে দাও; ID না থাকলে কী হয় দেখো
- [ ] Search-এ debounce সরিয়ে Network tab-এ call সংখ্যা দেখো

**৩. Mutation + invalidateQueries (P4)**
- [ ] Add / Delete / Toggle করো; Devtools-এ `['todos']` refetch দেখো
- [ ] `invalidateQueries` লাইন কমেন্ট করে দেখো UI কেন আপডেট হয় না
- [ ] json-server বন্ধ করে Add চাপো; error দেখাও
- [ ] `useToggleTodo`-কে **Optimistic Update** বানাও (onMutate → onError rollback → onSettled)
- [ ] Filter যোগ করো: All / Active / Completed (key: `['todos', { filter }]`)
- [ ] Edit title (PATCH) যোগ করো; list ও detail দুটোই invalidate করো

**৪. Pagination / Infinite (P5, P6)**
- [ ] `placeholderData: keepPreviousData` সরিয়ে পার্থক্য দেখো
- [ ] Load more-এর বদলে IntersectionObserver দিয়ে infinite scroll বানাও

**৫. বাড়তি চ্যালেঞ্জ**
- [ ] Query key factory বানাও (`todoKeys`)
- [ ] `prefetchQuery` দিয়ে user-এর উপর hover করলে data আগে আনো
- [ ] React Router যোগ করে `/users/:id` page বানাও (`useParams` + `Number(id)`)
- [ ] `select` দিয়ে completed todo-র সংখ্যা দেখাও

## API
- Users: https://jsonplaceholder.typicode.com/users (read-only, POST সংরক্ষণ করে না)
- Products: https://dummyjson.com/products (search, limit, skip সাপোর্ট করে)
- Todos: http://localhost:3001/todos (json-server, আসল CRUD)
