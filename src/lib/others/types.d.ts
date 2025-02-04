export interface Todo {
    id: number;
    finished: boolean;
    text: string;
}

export interface ParseResult {
    successful: boolean;
    error_message: string | null;
    todos: Todo[];
}

export interface Button {
    text: string;
    url: string;
}

export interface Config {
    haliPath: string | null;
}
