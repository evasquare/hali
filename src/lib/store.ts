import { writable } from "svelte/store";

import { getTodoList } from "./helpers";

import type { Todo } from "../types";

export const todoListPromiseStore = writable<Promise<Todo[]>>((getTodoList()));
export const endOfTodosStore = writable<HTMLDivElement | null>(null);