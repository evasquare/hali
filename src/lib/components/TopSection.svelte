<script lang="ts">
    import type { Button } from '../others/types';

    export let buttons: Button[];
    export let title: string | null;
</script>

<div class="top-section no-user-select">
    <div class="flex-row">
        <h1 class="title text-left">{title}</h1>
        <div>
            {#each buttons as button}
                <a href={button.url}>{button.text}</a>
            {/each}
        </div>
    </div>
</div>

<style>
    .top-section {
        width: 100%;
    }
    .top-section > .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .flex-row > .text-left {
        text-align: left;
    }
    .flex-row > .title {
        margin-bottom: 15px;
    }

    a {
        color: rgb(97, 97, 97);
        text-decoration: none;
    }
</style>
