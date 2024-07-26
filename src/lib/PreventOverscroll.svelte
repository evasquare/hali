<script lang="ts">
    let x: number;
    let y: number;

    $: {
        const documentHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;

        if (y < 0) {
            scrollTo(x, 0);
        }

        if (y > documentHeight - windowHeight + 35) {
            scrollTo(y, documentHeight - windowHeight + 35);
        }
    }
</script>

<svelte:window bind:scrollX={x} bind:scrollY={y} />
