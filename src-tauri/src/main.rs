// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use std::error::Error;

use serde::{Deserialize, Serialize};

mod testing;

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct Todo {
    finished: bool,
    text: String,
}

fn validate_each_line(line: &str) -> Result<Todo, Box<dyn Error>> {
    let error_message = r#"Invalid Syntax:
There's a line that doesn't start with `- [] ` or `- [x] `."#;

    if line.starts_with("- [] ") {
        let splitted_line = line.split("- [] ").last();
        match splitted_line {
            Some(splitted_line) => Ok(Todo {
                finished: false,
                text: splitted_line.to_string(),
            }),
            None => Err("Invalid Syntax".into()),
        }
    } else if line.starts_with("- [x] ") {
        let splitted_line = line.split("- [x] ").last();
        match splitted_line {
            Some(splitted_line) => Ok(Todo {
                finished: true,
                text: splitted_line.to_string(),
            }),
            None => Err(error_message.into()),
        }
    } else {
        Err("Invalid Syntax".into())
    }
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct ParseResult {
    successful: bool,
    error_message: Option<String>,
    todos: Vec<Todo>,
}

#[tauri::command(rename_all = "snake_case")]
fn parse_hali_format(input: &str) -> ParseResult {
    let mut result_todos: Vec<Todo> = vec![];

    for line in input.trim().split('\n') {
        match validate_each_line(line) {
            Ok(todo) => {
                result_todos.push(todo);
            }
            Err(e) => {
                return ParseResult {
                    successful: false,
                    error_message: Some(e.to_string()),
                    todos: vec![],
                };
            }
        }
    }

    ParseResult {
        successful: true,
        error_message: None,
        todos: result_todos,
    }
}

#[tauri::command]
fn stringify_hali_format(input: Vec<Todo>) -> String {
    let mut output = String::new();

    for (index, item) in input.iter().enumerate() {
        if index != 0 {
            output.push('\n')
        }

        if !item.finished {
            output.push_str(&format!("- [] {}", item.text));
        } else if item.finished {
            output.push_str(&format!("- [x] {}", item.text));
        }
    }

    output
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            parse_hali_format,
            stringify_hali_format
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
