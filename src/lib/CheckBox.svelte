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
        padding: 0;

        background: none;
        border: none;

        width: 18px;
        height: 18px;
        color: rgb(225, 225, 225);
        background-color: gray;
        font-size: 10px;
        font-weight: 700;
        border-radius: 5px;

        transition: all 0.16s ease-out;
        transform: none;
    }

    .delete-button:hover {
        color: white;
        background-color: tomato;
    }
    .delete-button:active {
        transform: scale(1.2, 1.2);
    }

    label {
        margin-left: 3px;
        transition: all 0.16s ease-out;
    }

    label:hover {
        color: rgb(162, 162, 162);
    }
    @media (prefers-color-scheme: dark) {
        label:hover {
            color: gray;
        }
    }
</style>
