<script lang="ts">
    import { platform } from "@tauri-apps/plugin-os";
    import { fly } from "svelte/transition";

    import CheckBox from "./CheckBox.svelte";
    import {
        endOfTodosStore,
        isLocked,
        todoListPromiseStore,
    } from "../../others/store";
    import { getTodoList, saveTodoList } from "../../others/helpers";
    import SubmitForm from "./SubmitForm.svelte";
    import TopSection from "../TopSection.svelte";

    import { flip } from "svelte/animate";
    import { dndzone, type DndEvent } from "svelte-dnd-action";

    import type { Todo } from "../../others/types";

    let windowDraggingRegionHeight = 15;
    $effect(() => {
        if (platform() == "macos") {
            windowDraggingRegionHeight = 30;
        }
        document.body.style.setProperty(
            "--dragging-region-height",
            `${windowDraggingRegionHeight}px`
        );
    });

    let todoDraggingAnimationSpeed = $state(200);

    // When adding new todos, the app scrolls down to `endOfTodos` element.
    let endOfTodos: HTMLDivElement | undefined;
    $effect(() => {
        endOfTodosStore.update(() => {
            return endOfTodos;
        });
    });

    let considering = $state(false);
    // Reads `todoListPromise` from a store.
    let todoListPromise: undefined | Promise<Todo[]> = $state();
    todoListPromiseStore.subscribe(async (newTodoListPromise) => {
        isLocked.set(true);
        if (considering) {
            todoDraggingAnimationSpeed = 200;
            todoListPromise = newTodoListPromise;
        } else {
            todoDraggingAnimationSpeed = 0;
            await saveTodoList(newTodoListPromise);
            todoListPromise = getTodoList();
        }
        isLocked.set(false);
    });

    // todoItems is used when rendering todos.
    let todoItems: undefined | Todo[] = $state(undefined);

    todoListPromiseStore.subscribe(async (newTodoListPromise) => {
        todoItems = await newTodoListPromise;
    });

    const handleDndConsider = (e: CustomEvent<DndEvent<Todo>>) => {
        considering = true;
        reorderPromiseStore(e.detail.items);
    };
    const handleDndFinalize = (e: CustomEvent<DndEvent<Todo>>) => {
        considering = false;
        reorderPromiseStore(e.detail.items);
    };
    const reorderPromiseStore = (newTodoList: Todo[]) => {
        todoListPromiseStore.update(async () => {
            return newTodoList;
        });
    };
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
                {#if todoItems}
                    <section
                        use:dndzone={{
                            items: todoItems,
                            flipDurationMs: todoDraggingAnimationSpeed,
                        }}
                        onconsider={handleDndConsider}
                        onfinalize={handleDndFinalize}
                    >
                        {#each todoItems as todo (todo.id)}
                            <div
                                animate:flip={{
                                    duration: todoDraggingAnimationSpeed,
                                }}
                            >
                                <CheckBox
                                    id={todo.id.toString()}
                                    finished={todo.finished}
                                    labelName={todo.text}
                                />
                            </div>
                        {/each}
                    </section>
                {/if}
                <div bind:this={endOfTodos}></div>
            </div>
        </div>

        <div class="bottom-section">
            <SubmitForm />
            <div class="absolute-wrapper">
                <div class="hide"></div>
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

    section {
        outline: none !important;
    }
</style>
