<script lang="ts">
    import { isLocked, todoListPromiseStore } from "../../others/store";
    import type { Todo } from "../../others/types";

    interface Props {
        finished: boolean;
        labelName: string;
        id: string;
    }
    let { finished, labelName, id }: Props = $props();

    let checked = $state(finished ?? false);

    let subscribedIsLocked = false;
    isLocked.subscribe((isLocked) => {
        subscribedIsLocked = isLocked;
    });

    const toggleCheckbox = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) => {
        event.preventDefault();
        if (subscribedIsLocked) return;

        checked = !checked;
        todoListPromiseStore.update(async (originalTodoListPromise) => {
            const newTodoList = await originalTodoListPromise;
            for (let i = 0; i < newTodoList.length; i++) {
                if (newTodoList[i].id.toString() === id) {
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
        if (subscribedIsLocked) return;

        todoListPromiseStore.update(async (originalTodoListPromise) => {
            const originalTodoList = await originalTodoListPromise;
            const newTodoList: Todo[] = [];

            let newId = 0;
            for (let i = 0; i < originalTodoList.length; i++) {
                if (originalTodoList[i].id.toString() === id) {
                    continue;
                }
                originalTodoList[i].id = newId;
                newId += 1;
                newTodoList.push(originalTodoList[i]);
            }

            return newTodoList;
        });
    };
</script>

<div class="component-wrapper no-user-select">
    <div class="flex-row">
        <div class="checkbox-wrapper">
            {#if checked}
                <!-- prettier-ignore -->
                <input
                    class="checkbox"
                    type="checkbox"
                    {id}
                    name="scales"
                    checked
                    onclick={toggleCheckbox}
                />
                <div class="pseudo-checkbox blue-background">
                    <div class="circle"></div>
                </div>
            {:else}
                <!-- prettier-ignore -->
                <input
                    class="checkbox"
                    type="checkbox"
                    {id}
                    name="scales"
                    onclick={toggleCheckbox}
                />
                <div class="pseudo-checkbox gray-background"></div>
            {/if}
        </div>
        <button class="delete-button" onclick={deleteElement}>X</button>
    </div>

    <label for={id}>{labelName}</label>
</div>

<style>
    .component-wrapper {
        width: 100%;

        column-gap: 8px;

        display: flex;
        align-items: flex-start;
    }

    .flex-row {
        height: 24px;

        column-gap: 5px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .flex-row > .delete-button {
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

    .gray-background {
        background-color: rgb(177, 177, 177);
        @media (prefers-color-scheme: dark) {
            background-color: rgb(95, 95, 95);
        }
    }
    .blue-background {
        background-color: cornflowerblue;
    }

    .checkbox-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        height: min-content;
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
        width: 100%;
        margin: 0;
        padding: 0;
        word-break: break-all;
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
