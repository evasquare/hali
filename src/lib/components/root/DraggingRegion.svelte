<script lang="ts">
    import { platform } from "@tauri-apps/api/os";
    let platformPromise = platform();
</script>

{#await platformPromise}
    <span>Loading platform information...</span>
{:then platform}
    {#if platform == "darwin"}
        <div data-tauri-drag-region class="dragging-region" />
    {:else}
        <div class="dragging-region" />
    {/if}
{/await}

<style>
    .dragging-region {
        z-index: 999;

        height: 30px;

        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        background-color: #f6f6f6;
        @media (prefers-color-scheme: dark) {
            background-color: #202020;
        }

        user-select: none;
        -webkit-user-select: none;
    }
</style>
