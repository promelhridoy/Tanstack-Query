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
