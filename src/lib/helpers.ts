import {
    BaseDirectory,
    createDir,
    exists,
    readTextFile,
    writeTextFile,
} from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";

import type { Todo } from "../types";

export const getHomeDir = async () => {
    return await homeDir();
};

export const getTodos = async (): Promise<Todo[]> => {
    await createDir("users", {
        dir: BaseDirectory.AppData,
        recursive: true,
    });

    if (await exists("todos.json", { dir: BaseDirectory.AppData })) {
        const todosJson = await readTextFile("todos.json", {
            dir: BaseDirectory.AppData,
        });
        const parsedTodos = JSON.parse(todosJson);

        const todos: Todo[] = [];
        for (const key of Object.keys(parsedTodos)) {
            todos.push(parsedTodos[key]);
        }
        return todos;
    } else {
        return [];
    }
};

/** @example
 * saveTodos([{ finished: true, text: "Test" }]);
 */
export const saveTodos = async (todos: Todo[]): Promise<void> => {
    await createDir("users", {
        dir: BaseDirectory.AppData,
        recursive: true,
    });

    const stringifiedTodos = JSON.stringify(todos, null, 4);
    await writeTextFile("todos.json", stringifiedTodos, {
        dir: BaseDirectory.AppData,
    });
};
