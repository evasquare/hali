<script lang="ts">
    import { delay } from "../../others/helpers";
    import { todoListPromiseStore, endOfTodosStore } from "../../others/store";

    let submitButtonClass = "submit-button";
    const playButtonAnimation = async () => {
        submitButtonClass = "submit-button active-button";
        await delay(160);
        submitButtonClass = "submit-button";
    };

    let endOfTodos: HTMLDivElement | null;
    endOfTodosStore.subscribe((value) => {
        endOfTodos = value;
    });

    let inputValue: string;
    const scrollToEnd = async (endOfTodos: HTMLDivElement) => {
        await delay(50);
        endOfTodos.scrollIntoView();
    };
    const submitForm = async (
        e: SubmitEvent & {
            currentTarget: EventTarget & HTMLFormElement;
        }
    ) => {
        if (inputValue === "" || inputValue.split(" ").join("").length < 1)
            return;

        if (endOfTodos !== null) {
            scrollToEnd(endOfTodos);
        }

        await todoListPromiseStore.update(async (originalTodoListPromise) => {
            playButtonAnimation();
            const newTodoList = await originalTodoListPromise;
            newTodoList.push({
                finished: false,
                text: inputValue,
            });

            return newTodoList;
        });
        inputValue = "";
    };
</script>

<form on:submit|preventDefault={submitForm}>
    <input
        type="text"
        class="text-input"
        placeholder="Add something here..."
        bind:value={inputValue}
    />
    <button class={submitButtonClass}>Add</button>
</form>

<style>
    form {
        user-select: none;
        -webkit-user-select: none;

        z-index: 10;

        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    form > .text-input {
        all: unset;

        width: 100%;
        height: 28px;

        padding: 2px 6px;
        margin-right: 8px;

        color: white;
        background-color: rgb(111, 111, 111);
        font-size: small;
        font-weight: 500;
        border-radius: 7px;

        @media (prefers-color-scheme: dark) {
            background-color: #ffffff;
            color: rgb(61, 61, 61);
        }
    }

    form > .text-input::placeholder {
        color: rgb(225, 225, 225);
    }
    @media (prefers-color-scheme: dark) {
        form > .text-input::placeholder {
            color: rgb(61, 61, 61);
        }
    }

    .submit-button {
        padding: 0;
        background: none;
        border: none;

        height: 32px;
        padding: 7.5px 15px;

        color: white;
        background-color: cornflowerblue;
        font-weight: 500;
        border-radius: 7px;

        transition: all 0.16s ease-out;
        transform: none;
    }
    .submit-button:hover {
        color: white;
        background-color: rgb(141, 180, 252);
    }
    .submit-button:active {
        transform: scale(1.2, 1.2);
    }

    .active-button {
        transform: scale(1.2, 1.2);
        background-color: rgb(141, 180, 252);
    }
</style>
