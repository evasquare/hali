<script lang="ts">
    import CheckBox from './lib/CheckBox.svelte';
    import SubmitForm from './lib/SubmitForm.svelte';
    import TopSection from './lib/TopSection.svelte';
    import type { Todo } from './types';
    import { saveTodoList } from './lib/helpers';
    import { todoListPromiseStore } from './lib/store';

    let todoListPromise: Promise<Todo[]>;
    todoListPromiseStore.subscribe((newTodoListPromise) => {
        todoListPromise = newTodoListPromise;
        saveTodoList(newTodoListPromise);
    });
</script>

<div data-tauri-drag-region class="dragging-region" />
<main class="safe-area-wrapper y-padding">
    <div class="top-fixed">
        <TopSection />
    </div>

    <div class="column-flex-wrapper">
        <div class="column-section">
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
    </div>

    <div class="bottom-fixed">
        <SubmitForm />
        <div class="absolute-wrapper">
            <div class="hide" />
        </div>
    </div>
</main>

<style>
    .y-padding {
        padding: 0px 10px;
    }

    .dragging-region {
        height: 30px;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        right: 0;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }
        user-select: none;
        -webkit-user-select: none;
    }

    .safe-area-wrapper {
        height: 100%;
        margin-top: 35px;
    }

    .top-fixed {
        position: fixed;
        top: 30px;
        left: 0;
        right: 0;
        padding: 0px 10px;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }
    }
    .bottom-fixed {
        position: fixed;

        margin-bottom: 30px;
        padding: 0px 10px;
        right: 0;
        left: 0;
        bottom: 0;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .safe-area-wrapper > .column-flex-wrapper {
        width: 100%;
        height: 100%;
        margin-top: 30px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .column-flex-wrapper > .column-section {
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        padding-top: 101px;
        padding-bottom: 87px;
    }

    .bottom-fixed > .absolute-wrapper {
        position: absolute;
    }
    .absolute-wrapper > .hide {
        z-index: 5;

        overflow-y: hidden;

        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;

        padding: 42px 0px;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }
    }
</style>
