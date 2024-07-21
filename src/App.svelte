<script lang="ts">
    import CheckBox from './lib/CheckBox.svelte';
    import TopSection from './lib/TopSection.svelte';
    import { saveTodos } from './lib/helpers';
    import { todosStore } from './lib/store';
    import type { Todo } from './types';

    let todos: Todo[];
    todosStore.subscribe((value) => {
        todos = value;
        saveTodos(value);
    });
</script>

<div data-tauri-drag-region class="dragging-region" />
<main class="safe-area y-padding">
    <div class="column-flex">
        <div class="column-section-1">
            <TopSection />

            {#each todos as todo}
                <CheckBox id={todo.id} finished={todo.finished} labelName={todo.text} />
            {/each}
        </div>

        <div class="column-section-2">
            <form on:submit|preventDefault={() => {}}>
                <input type="text" />
                <button class="submit-button">Add</button>
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

    .column-section-2 > form > .submit-button {
        height: 20px;
    }
</style>
