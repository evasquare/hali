import { invoke } from "@tauri-apps/api";
import { homeDir } from "@tauri-apps/api/path";

export const getHomeDir = async () => {
    return await homeDir();
};

interface Todo {
    finished: boolean;
    text: string;
}

export const getTodos = (): Todo[] => {
    return [
        {
            finished: true,
            text: "First Todo",
        },
        {
            finished: false,
            text: "Second Todo",
        },
    ];
};
