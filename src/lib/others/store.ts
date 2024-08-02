import { writable } from "svelte/store";

import { getTodoListFromHali } from "./helpers";

import type { Todo } from "./types";

export const todoListPromiseStore = writable<Promise<Todo[]>>((getTodoListFromHali()));
export const endOfTodosStore = writable<HTMLDivElement | null>(null);