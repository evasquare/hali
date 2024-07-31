import { invoke } from "@tauri-apps/api";
import {
    BaseDirectory,
    createDir,
    exists,
    readTextFile,
    writeTextFile,
} from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";

import type { ParseResult, Todo } from "../types";
export const getHomeDir = async () => {
    return await homeDir();
};

export const getTodoListFromHali = async (): Promise<Todo[]> => {
    await createDir("users", {
        dir: BaseDirectory.AppData,
        recursive: true,
    });

    if (await exists("todos.hali", { dir: BaseDirectory.AppData })) {
        const todoListHali = await readTextFile("todos.hali", {
            dir: BaseDirectory.AppData,
        });
        const parseResult: ParseResult = await invoke("parse_hali_format", {
            input: todoListHali
        });

        if (!parseResult.successful && parseResult.error_message !== "") {
            throw new Error(parseResult.error_message?.toString());
        }
        return parseResult.todos;
    } else {
        return [];
    }
}
export const getTodoListFromJson = async (): Promise<Todo[]> => {
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

export const saveTodoListFromHali = async (todoListPromise: Promise<Todo[]>): Promise<void> => {
    await createDir("users", {
        dir: BaseDirectory.AppData,
        recursive: true,
    });

    const stringifiedTodoList: string = await invoke("stringify_hali_format", {
        input: await todoListPromise
    });
    await writeTextFile("todos.hali", stringifiedTodoList, {
        dir: BaseDirectory.AppData,
    });
};

/** @example
 * saveTodoListFromJson([{ id: "1", finished: true, text: "Test" }]);
 */
export const saveTodoListFromJson = async (todoListPromise: Promise<Todo[]>): Promise<void> => {
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
