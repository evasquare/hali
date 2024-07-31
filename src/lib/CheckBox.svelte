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
                if (i.toString() === id) {
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

            for (let i = 0; i < originalTodoList.length; i++) {
                if (i.toString() === id) {
                    continue;
                }
                newTodoList.push(originalTodoList[i]);
            }

            return newTodoList;
        });
    };
</script>

<div class="checkbox-section no-user-select center">
    <div class="checkbox-wrapper">
        {#if checked}
            <!-- prettier-ignore -->
            <input
                class="checkbox"
                type="checkbox"
                {id}
                name="scales"
                checked
                on:click|preventDefault={toggleCheckbox}
            />
            <div class="pseudo-checkbox blue-background">
                <div class="circle" />
            </div>
        {:else}
            <!-- prettier-ignore -->
            <input
                class="checkbox"
                type="checkbox"
                {id}
                name="scales"
                on:click|preventDefault={toggleCheckbox}
            />
            <div class="pseudo-checkbox gray-background" />
        {/if}
    </div>

    <button class="delete-button" on:click={deleteElement}>X</button>
    <label for={id}>{labelName}</label>
</div>

<style>
    .center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .gray-background {
        background-color: rgb(177, 177, 177);
        @media (prefers-color-scheme: dark) {
            background-color: rgb(95, 95, 95);
        }
    }
    .blue-background {
        background-color: cornflowerblue;
    }

    .checkbox-section {
        display: flex;
        flex-direction: row;
        align-items: center;

        column-gap: 5px;
    }

    .delete-button {
        border: none;
        background: none;

        width: 18px;
        height: 18px;

        padding: 0;

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

    .checkbox-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .checkbox-wrapper > .pseudo-checkbox {
        z-index: -50;

        width: 16px;
        height: 16px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50px;
    }
    .pseudo-checkbox > .circle {
        width: 6px;
        height: 6px;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }
        border-radius: 50px;
    }
    .checkbox-wrapper > .checkbox {
        z-index: 30;

        width: 16px;
        height: 16px;

        position: absolute;
        top: 100;
        bottom: 100;
        left: 100;
        right: 100;

        opacity: 0;
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
