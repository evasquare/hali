import { fs } from "@tauri-apps/api";
import { BaseDirectory, createDir, readTextFile } from "@tauri-apps/api/fs";
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
    const appDataDirString = await appDataDir();
    if (!fs.readDir(appDataDirString)) {
        await createDir(appDataDirString);
    }

    const todosJson = await readTextFile("todos.json", {
        dir: BaseDirectory.AppData,
    });
    const parsedTodos = JSON.parse(todosJson);

    const todos: Todo[] = [];
    for (const key of Object.keys(parsedTodos)) {
        todos.push(parsedTodos[key]);
    }
    return todos;
};
