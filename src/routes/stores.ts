import { derived, writable } from 'svelte/store';

export type Priority = { value: number; label: string };
export const priorities: Priority[] = [
	{ value: 1, label: '高' },
	{ value: 2, label: '中' },
	{ value: 3, label: '低' }
];

export type TodoItem = {
	id: number;
	title: string;
	priority: Priority;
};

const createTodoList = () => {
	const { subscribe, update } = writable<TodoItem[]>([]);
	const addItem = (title: string, priority: Priority) => {
		const id = new Date().getTime();
		update((todoList) => [...todoList, { id, title, priority }]);
	};
	const completeItem = (id: number) => {
		update((todoList) => todoList.filter((todo) => todo.id !== id));
	};
	return { subscribe, addItem, completeItem };
};

export const todoList = createTodoList();

export const sortedTodoList = derived(todoList, (todoList) =>
	todoList.sort((item1, item2) => item1.priority.value - item2.priority.value)
);
