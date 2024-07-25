<script lang="ts">
    import { todoListPromiseStore } from './store';
    import type { Todo } from '../types';

    export let finished: boolean | null;
    export let labelName: string | null;
    export let id: string | null;

    $: checked = finished ?? false;

    const toggleCheckbox = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) => {
        checked = !checked;
        todoListPromiseStore.update(async (originalTodoListPromise) => {
            const newTodoList = await originalTodoListPromise;
            for (let i = 0; i < newTodoList.length; i++) {
                if (newTodoList[i].id == id) {
                    newTodoList[i].finished = checked;
                }
            }

            return newTodoList;
        });
    };

    const deleteElement = (
        e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        todoListPromiseStore.update(async (originalTodoListPromise) => {
            const originalTodoList = await originalTodoListPromise;
            const newTodoList: Todo[] = [];

            for (const todo of originalTodoList) {
                if (todo.id === id) {
                    continue;
                }
                newTodoList.push(todo);
            }

            return newTodoList;
        });
    };
</script>

<div class="checkbox-section no-user-select">
    <!-- prettier-ignore -->
    {#if checked}
        <input
            type="checkbox"
            {id}
            name="scales"
            checked
            on:click|preventDefault={toggleCheckbox}
        />
    {:else}
        <input
            type="checkbox"
            {id}
            name="scales"
            on:click|preventDefault={toggleCheckbox} />
    {/if}

    <button class="delete-button" on:click={deleteElement}>X</button>
    <label for={id}>{labelName}</label>
</div>

<style>
    .checkbox-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;
    }

    .delete-button {
        font-size: 11px;
    }

    label {
        margin-left: 3px;
    }
</style>
