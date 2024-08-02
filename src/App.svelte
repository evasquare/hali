<script lang="ts">
    import { Route } from 'tinro';
    import DraggingRegion from './lib/components/root/DraggingRegion.svelte';
    import Root from './lib/components/root/Root.svelte';
    import Settings from './lib/components/settings/Settings.svelte';
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

<style>
    main {
        height: 100%;

        position: relative;
        margin-top: var(--dragging-region-height);
    }
</style>
