<script lang="ts">
    import { open } from "@tauri-apps/api/dialog";
    import { relaunch } from "@tauri-apps/api/process";
    import { fly } from "svelte/transition";

    import OptionDescription from "./OptionDescription.svelte";
    import { getConfig, saveConfig } from "../../others/helpers";
    import type { Config } from "../../others/types";
    import TopSection from "../TopSection.svelte";

    let config: Config;
    let fileDir: string;
    $: {
        (async () => {
            config = await getConfig();

            if (config.haliPath === null) {
                fileDir = "Default";
            } else {
                fileDir = config.haliPath;
            }
        })();
    }

    const changeDir = async (
        e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        let input = document.createElement("input");
        input.type = "file";

        const filePath = await open({
            filters: [
                {
                    name: "text",
                    extensions: ["hali"],
                },
            ],
        });
        if (!filePath) return;

        fileDir = String(filePath);
        config.haliPath = String(filePath);
        await saveConfig(config);
        relaunch();
    };

    const resetDir = async (
        e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        config.haliPath = null;
        await saveConfig(config);
        relaunch();
    };
</script>

<div class="transition-block" in:fly={{ x: 400 }} out:fly={{ x: -400 }}>
    <div class="page-wrapper">
        <div class="top-section-wrapper">
            <TopSection
                title="Settings"
                buttons={[{ text: "Close →", url: "/" }]}
            />
        </div>

        <div class="column-section-wrapper rounded-box">
            <div class="column-section">
                <div class="column row-section">
                    <OptionDescription
                        title="Hali File location"
                        span={fileDir}
                    />
                    <div class="button-box no-user-select">
                        <button on:click={changeDir}>Change</button>
                        <button on:click={resetDir}>Reset</button>
                    </div>
                </div>
                <div class="column">
                    <OptionDescription title="Version" span="0.0.0" />
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
        @media (prefers-color-scheme: dark) {
            color-scheme: dark;
        }
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

    .row-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 14px;
    }

    .button-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        gap: 6px;
    }

    button {
        border: none;
        background: none;

        padding: 5px 15px;
        color: rgb(225, 225, 225);
        background-color: cornflowerblue;
        font-size: 10px;
        font-weight: 700;
        border-radius: 7px;

        transition: all 0.16s ease-out;
        transform: none;
    }
    button:hover {
        color: white;
        background-color: rgb(141, 180, 252);
    }
    button:active {
        transform: scale(1.1, 1.1);
        background-color: rgb(141, 180, 252);
    }
</style>
