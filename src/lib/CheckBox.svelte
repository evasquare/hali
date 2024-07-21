<script lang="ts">
    import { todosStore } from '../store';

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
        <label for={id}>{labelName}</label>
    {:else}
        <input type="checkbox" {id} name="scales" on:click|preventDefault={handleCheckboxClick} />
        <label for={id}>{labelName}</label>
    {/if}
</div>
