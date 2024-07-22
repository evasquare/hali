<script lang="ts">
    import type { Todo } from '../types';
    import { todoListPromiseStore } from './store';

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

    const handleDelete = (
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
