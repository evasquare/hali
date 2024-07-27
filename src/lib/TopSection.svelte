<script lang="ts">
    let text = '';
</script>

<div class="top-section no-user-select">
    <h1 class="title text-left">TODOs</h1>
    <input
        type="text"
        placeholder="So uh... what was I going to do again?"
        class="message-input"
        value={text}
    />
</div>

<style>
    .top-section {
        width: 100%;
    }
    .top-section > .text-left {
        text-align: left;
    }
    .top-section > .title {
        margin-bottom: 15px;
    }

    .message-input {
        all: unset;

        width: 100%;

        padding: 0 0;
        margin-bottom: 20px;

        color: #0f0f0f;
        font-size: 100%;
        font-weight: 500;

        @media (prefers-color-scheme: dark) {
            color: white;
        }
    }
</style>
