<script lang="ts">
    import CheckBox from "./lib/CheckBox.svelte";
    import TopSection from "./lib/TopSection.svelte";

    import { getTodos } from "./helpers";

    let todoPromise = getTodos();
</script>

<div data-tauri-drag-region class="dragging-region" />
<main class="safe-area">
    <div class="center-box">
        <TopSection />

        {#await todoPromise}
            <span>Loading todos...</span>
        {:then todos}
            {#each todos as todo, index}
                <CheckBox
                    id={index.toString()}
                    finished={todo.finished}
                    labelName={todo.text}
                />
            {/each}
        {:catch error}
            <span>Error: {error}</span>
        {/await}
    </div>
</main>

<style>
    .dragging-region {
        height: 30px;
        user-select: none;
        -webkit-user-select: none;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        right: 0;
    }

    .safe-area {
        margin-top: 30px;
        padding: 5px;
    }

    .center-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }
</style>
