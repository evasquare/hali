<script lang="ts">
    import { getHomeDir, getTodos } from "./helpers";
    import CheckBox from "./lib/CheckBox.svelte";
    import TopSection from "./lib/TopSection.svelte";

    let todos = getTodos();
    let homeDirPromise = getHomeDir();
</script>

<div data-tauri-drag-region class="dragging-region" />
<main class="safe-area">
    <div class="center-box">
        <TopSection />

        {#each todos as todo, index}
            <CheckBox
                id={index.toString()}
                finished={todo.finished}
                labelName={todo.text}
            />
        {/each}
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
