<script lang="ts">
    import type { Todo } from '../types';
    import { todosStore } from './store';

    export let finished: boolean | null;
    export let labelName: string | null;
    export let id: string | null;

    $: checked = finished ?? false;

    const handleCheckboxClick = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) => {
        checked = !checked;
        todosStore.update((todos) => {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id == id) {
                    todos[i].finished = checked;
                }
            }
            return todos;
        });
    };

    const handleDelete = (
        e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        todosStore.update((originalTodos) => {
            const newTodos: Todo[] = [];

            for (const todo of originalTodos) {
                if (todo.id === id) {
                    continue;
                }
                newTodos.push(todo);
            }

            return newTodos;
        });
    };
</script>

<div class="checkbox-group no-user-select">
    {#if checked}
        <input
            type="checkbox"
            {id}
            name="scales"
            checked
            on:click|preventDefault={handleCheckboxClick}
        />
    {:else}
        <input type="checkbox" {id} name="scales" on:click|preventDefault={handleCheckboxClick} />
    {/if}
    <button on:click={handleDelete}>X</button>
    <label for={id}>{labelName}</label>
</div>
