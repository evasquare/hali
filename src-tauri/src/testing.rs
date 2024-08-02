mod parse_hali_format {
    #[allow(unused_imports)]
    use super::super::parse_hali_format;
    #[allow(unused_imports)]
    use crate::{ParseResult, Todo};

    #[test]
    fn case_1() {
        let input = r#"- [] Task 1
- [x] Task 2
- [] Task 3"#;
        let expected_output = ParseResult {
            successful: true,
            error_message: None,
            todos: vec![
                Todo {
                    finished: false,
                    text: "Task 1".to_string(),
                },
                Todo {
                    finished: true,
                    text: "Task 2".to_string(),
                },
                Todo {
                    finished: false,
                    text: "Task 3".to_string(),
                },
            ],
        };

        let output = parse_hali_format(input);

        assert_eq!(output, expected_output);
    }

    #[test]
    fn case_2() {
        let input = r#"
- [] Task 1
- [x] Task 2
- [] Task 3
"#;
        let expected_output = ParseResult {
            successful: true,
            error_message: None,
            todos: vec![
                Todo {
                    finished: false,
                    text: "Task 1".to_string(),
                },
                Todo {
                    finished: true,
                    text: "Task 2".to_string(),
                },
                Todo {
                    finished: false,
                    text: "Task 3".to_string(),
                },
            ],
        };

        let output = parse_hali_format(input);

        assert_eq!(output, expected_output);
    }
}
