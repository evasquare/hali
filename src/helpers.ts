import {
    BaseDirectory,
    createDir,
    exists,
    readTextFile,
    writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir, homeDir } from "@tauri-apps/api/path";

export const getHomeDir = async () => {
    return await homeDir();
};

interface Todo {
    finished: boolean;
    text: string;
}

interface Todo {
    finished: boolean;
    text: string;
}

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
