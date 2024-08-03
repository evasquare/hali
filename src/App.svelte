<script lang="ts">
    import { Route } from 'tinro';
    import DraggingRegion from './lib/components/root/DraggingRegion.svelte';
    import Root from './lib/components/root/Root.svelte';
    import Settings from './lib/components/settings/Settings.svelte';

    function onKeyDown(
        e: KeyboardEvent & {
            currentTarget: EventTarget & Window;
        }
    ) {
        if (e.key === 'Backspace' && !(e.target instanceof HTMLInputElement)) {
            e.preventDefault();
        }
    }
</script>

<DraggingRegion />
<main>
    <Route class="route" path="/" let:meta>
        <Root />
    </Route>
    <Route path="/:page" let:meta>
        <Settings />
    </Route>
</main>

<svelte:window on:keydown={onKeyDown} />

<style>
    main {
        height: 100%;

        position: relative;
        margin-top: var(--dragging-region-height);
    }
</style>
