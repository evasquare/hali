<script lang="ts">
    interface Props {
        title: string;
        span: string;
    }
    let { title, span }: Props = $props();
</script>

<div>
    <h4 class="no-user-select">{title}</h4>
    <span>{span}</span>
</div>

<style>
    h4 {
        font-weight: 600;
        font-size: 16px;
        margin: 0px;
    }
    span {
        font-weight: 500;
        font-size: 13px;
        line-height: normal;

        word-break: break-all;

        color: rgb(131, 131, 131);
        @media (prefers-color-scheme: dark) {
            color: rgb(164, 164, 164);
        }
    }
</style>
