<script lang="ts">
    import { platform } from '@tauri-apps/api/os';

    import CheckBox from './lib/CheckBox.svelte';
    import DraggingRegion from './lib/DraggingRegion.svelte';
    import { saveTodoList } from './lib/helpers';
    import { endOfTodosStore, todoListPromiseStore } from './lib/store';
    import SubmitForm from './lib/SubmitForm.svelte';
    import TopSection from './lib/TopSection.svelte';

    import type { Todo } from './types';

    let endOfTodos: HTMLDivElement | null = null;
    $: {
        endOfTodosStore.update(() => {
            return endOfTodos;
        });
    }

    let todoListPromise: Promise<Todo[]>;
    todoListPromiseStore.subscribe((newTodoListPromise) => {
        todoListPromise = newTodoListPromise;
        saveTodoList(newTodoListPromise);
    });

    let draggingRegionHeight = 15;
    $: {
        let platformPromise = platform();
        platformPromise.then((platform) => {
            if (platform == 'darwin') {
                draggingRegionHeight = 30;
            }
            document.body.style.setProperty(
                '--dragging-region-height',
                `${draggingRegionHeight}px`
            );
        });
    }
</script>

<DraggingRegion />
<main class="main">
    <div class="top-section">
        <TopSection />
    </div>

    <div class="column-section-wrapper">
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
            <div bind:this={endOfTodos} />
        </div>
    </div>

    <div class="bottom-section">
        <SubmitForm />
        <div class="absolute-wrapper">
            <div class="hide" />
        </div>
    </div>
</main>

<style>
    .main {
        height: 100%;

        padding: 0px 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .column-section-wrapper {
        width: 100%;
        height: 70%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        overflow: scroll;
        overflow-x: hidden;
    }
    .column-section-wrapper > .column-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }

    .top-section {
        margin-top: var(--dragging-region-height);

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }
    }
    .bottom-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }

        margin-top: calc(var(--dragging-region-height) - calc(var(--dragging-region-height)) / 2);
    }
</style>
