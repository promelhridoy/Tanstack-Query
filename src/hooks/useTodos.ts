import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, getTodos, toggleTodo, type Todo } from '../api/todos';

const TODOS_KEY = ['todos'];

export function useTodos() {
  return useQuery({ queryKey: TODOS_KEY, queryFn: getTodos });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

// TODO (practice): এই toggle-কে optimistic update বানাও (onMutate / onError / onSettled)
export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => toggleTodo(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}


// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { addTodo, deleteTodo, getTodos, toggleTodo, type Todo } from '../api/todos';

// const TODOS_KEY = ['todos'];

// export function useTodos() {
//   return useQuery({ queryKey: TODOS_KEY, queryFn: getTodos });
// }

// export function useAddTodo() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addTodo,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
//   });
// }

// export function useDeleteTodo() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteTodo,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
//   });
// }

// // Optimistic Update সহ useToggleTodo হুক
// export function useToggleTodo() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (todo: Todo) => toggleTodo(todo),

//     // ১. রিকোয়েস্ট পাঠানোর আগেই UI ইনস্ট্যান্ট আপডেট করে ফেলো
//     onMutate: async (updatedTodo) => {
//       await queryClient.cancelQueries({ queryKey: TODOS_KEY });
//       const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_KEY);

//       queryClient.setQueryData<Todo[]>(TODOS_KEY, (old) =>
//         old?.map((t) => (t.id === updatedTodo.id ? { ...t, completed: !t.completed } : t))
//       );

//       return { previousTodos };
//     },

//     // ২. কোনো কারণে ফেইল করলে আগের ডেটায় ফিরে যাও (Rollback)
//     onError: (_err, _updatedTodo, context) => {
//       if (context?.previousTodos) {
//         queryClient.setQueryData(TODOS_KEY, context.previousTodos);
//       }
//     },

//     // ৩. কাজ শেষ হলে সার্ভারের ডেটার সাথে সিঙ্ক করো
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: TODOS_KEY });
//     },
//   });
// }