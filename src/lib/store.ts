import { writable } from "svelte/store";

import { getTodos } from "./helpers";

import type { Todo } from "../types";

export const todosStore = writable<Todo[]>(await getTodos());
