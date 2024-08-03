<script>
    import { fly } from 'svelte/transition';
    import TopSection from '../TopSection.svelte';
</script>

<div class="transition-block" in:fly={{ x: 400 }} out:fly={{ x: -400 }}>
    <div class="page-wrapper">
        <div class="top-section-wrapper">
            <TopSection title="Settings" buttons={[{ text: 'Close →', url: '/' }]} />
        </div>

        <div class="column-section-wrapper rounded-box">
            <div class="column-section">
                <div class="column">
                    <h4 class="no-user-select">File location</h4>
                    <span>Default</span>
                </div>
                <div class="column">
                    <h4 class="no-user-select">Version</h4>
                    <span>0.0.0</span>
                </div>
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

    .rounded-box {
        border-radius: 10.5px;
    }

    .column-section-wrapper {
        width: 100%;
        height: 100%;

        margin-top: 5px;
        margin-bottom: var(--dragging-region-height);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        overflow: scroll;
        overflow-x: hidden;
        color-scheme: dark;
    }
    .column-section-wrapper > .column-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;

        row-gap: 10px;
    }

    .column-section > .column {
        width: 100%;

        box-sizing: border-box;

        padding: 13px 10px;
        border-radius: 10.5px;

        background-color: #eeeeee;
        @media (prefers-color-scheme: dark) {
            background-color: rgb(41, 41, 41);
        }
    }
    .column > h4 {
        font-weight: 600;
        font-size: 16px;
        margin: 0px;
    }
    .column > span {
        font-weight: 500;
        font-size: 13px;

        color: rgb(177, 177, 177);
        @media (prefers-color-scheme: dark) {
            color: rgb(95, 95, 95);
        }
    }
</style>
