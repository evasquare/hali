<script lang="ts">
    import { platform } from "@tauri-apps/api/os";

    import { fly } from "svelte/transition";

    import CheckBox from "./CheckBox.svelte";
    import { endOfTodosStore, todoListPromiseStore } from "../../others/store";
    import { saveTodoList } from "../../others/helpers";
    import SubmitForm from "./SubmitForm.svelte";
    import TopSection from "../TopSection.svelte";

    import type { Todo } from "../../others/types";

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
            if (platform == "darwin") {
                draggingRegionHeight = 30;
            }
            document.body.style.setProperty(
                "--dragging-region-height",
                `${draggingRegionHeight}px`
            );
        });
    }
</script>

<div class="transition-block" in:fly={{ x: 400 }} out:fly={{ x: -400 }}>
    <div class="page-wrapper">
        <div class="top-section-wrapper">
            <TopSection
                title="Todos "
                buttons={[{ text: "Settings →", url: "/settings" }]}
            />
        </div>

        <div class="column-section-wrapper">
            <div class="column-section">
                {#await todoListPromise}
                    <span>Loading todos...</span>
                {:then todoList}
                    {#each todoList as todo, index}
                        <CheckBox
                            id={index.toString()}
                            finished={todo.finished}
                            labelName={todo.text}
                        />
                    {/each}
                {:catch error}
                    <span>{error}</span>
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
    </div>
</div>

<style>
    .transition-block {
        padding: 0px 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .page-wrapper {
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .column-section-wrapper {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        overflow: scroll;
        overflow-x: hidden;
        @media (prefers-color-scheme: dark) {
            color-scheme: dark;
        }
    }
    .column-section-wrapper > .column-section {
        padding: 2px 0px;
        row-gap: 2px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }

    .top-section-wrapper {
        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }
    }
    .bottom-section {
        margin-bottom: var(--dragging-region-height);

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }

        margin-top: calc(
            var(--dragging-region-height) - calc(var(--dragging-region-height)) /
                2
        );
    }
</style>
