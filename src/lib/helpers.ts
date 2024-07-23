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

export const getTodoList = async (): Promise<Todo[]> => {
    await createDir("users", {
        dir: BaseDirectory.AppData,
        recursive: true,
    });

    if (await exists("todos.json", { dir: BaseDirectory.AppData })) {
        const todoListJson = await readTextFile("todos.json", {
            dir: BaseDirectory.AppData,
        });
        const parsedTodoList = JSON.parse(todoListJson);

        const todoList: Todo[] = [];
        for (const key of Object.keys(parsedTodoList)) {
            todoList.push(parsedTodoList[key]);
        }
        return todoList;
    } else {
        return [];
    }
};

/** @example
 * saveTodoList([{ id: "1", finished: true, text: "Test" }]);
 */
export const saveTodoList = async (todoListPromise: Promise<Todo[]>): Promise<void> => {
    await createDir("users", {
        dir: BaseDirectory.AppData,
        recursive: true,
    });

    const stringifiedTodoList = JSON.stringify(await todoListPromise, null, 4);
    await writeTextFile("todos.json", stringifiedTodoList, {
        dir: BaseDirectory.AppData,
    });
};

/** @example
 * await delay(5000);
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
