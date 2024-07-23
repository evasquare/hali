<script lang="ts">
    import CheckBox from './lib/CheckBox.svelte';
    import TopSection from './lib/TopSection.svelte';
    import { delay, saveTodoList } from './lib/helpers';
    import { todoListPromiseStore } from './lib/store';
    import type { Todo } from './types';

    let todoListPromise: Promise<Todo[]>;
    todoListPromiseStore.subscribe((newTodoListPromise) => {
        todoListPromise = newTodoListPromise;
        saveTodoList(newTodoListPromise);
    });

    let submitButtonClass = 'submit-button';
    const playButtonAnimation = async () => {
        submitButtonClass = 'submit-button active-button';
        await delay(160);
        submitButtonClass = 'submit-button';
    };

    let inputValue: string;
    const handleSubmit = async (
        e: SubmitEvent & {
            currentTarget: EventTarget & HTMLFormElement;
        }
    ) => {
        if (inputValue === '' || inputValue.split(' ').join('').length < 1) return;

        await todoListPromiseStore.update(async (originalTodoListPromise) => {
            playButtonAnimation();
            const newTodoList = await originalTodoListPromise;
            newTodoList.push({
                id: String(Date.now()),
                finished: false,
                text: inputValue
            });

            return newTodoList;
        });

        inputValue = '';
    };
</script>

<div data-tauri-drag-region class="dragging-region" />
<main class="safe-area y-padding">
    <div class="column-flex">
        <div class="column-section-1">
            <TopSection />

            {#await todoListPromise}
                <span>Loading todos...</span>
            {:then todoList}
                {#each todoList as todo}
                    <CheckBox id={todo.id} finished={todo.finished} labelName={todo.text} />
                {/each}
            {:catch error}
                <span>Error: {error}</span>
            {/await}
        </div>

        <div class="column-section-2">
            <form on:submit|preventDefault={handleSubmit}>
                <input type="text" bind:value={inputValue} />
                <button class={submitButtonClass}>Add</button>
            </form>
        </div>
    </div>
</main>

<style>
    .y-padding {
        padding: 0px 10px;
    }

    .dragging-region {
        height: 30px;
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        right: 0;

        user-select: none;
        -webkit-user-select: none;
    }
    .safe-area {
        height: 100%;
        margin-top: 30px;
    }

    .safe-area > .column-flex {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .column-flex > .column-section-1 {
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }
    .column-flex > .column-section-2 {
        margin-bottom: 30px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .column-section-2 > form {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .column-section-2 > form > input {
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
