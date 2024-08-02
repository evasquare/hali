<script>
    import { fly } from 'svelte/transition';
    import TopSection from '../TopSection.svelte';
</script>

<div class="transition-block" in:fly={{ x: 400 }} out:fly={{ x: -400 }}>
    <div class="top-section-wrapper">
        <TopSection title="Settings" buttons={[{ text: 'Close →', url: '/' }]} />
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
</style>
