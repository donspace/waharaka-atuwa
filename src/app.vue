<template>

    <n-config-provider>
        <div class="container">

            <!-- Tabs -->

            <n-tabs @update:value="handleTabSwitch" v-model:value="currentTab" type="line" animated>

                <n-tab-pane name="damma" tab="📁 ධම්ම">

                    <div class="tree">
                        <n-menu :options="menuOptions" :render-label="renderLabel" @update:value="handleSelect" />
                    </div>

                </n-tab-pane>
                <n-tab-pane name="abidamma" tab="📁 අභිධම්ම">

                    <div class="tree">
                        <n-menu :options="menuOptions" :render-label="renderLabel" @update:value="handleSelect" />
                    </div>

                </n-tab-pane>
                <n-tab-pane name="upadesa" tab="📁 උපදේස">

                    <div class="tree">
                        <n-menu :options="menuOptions" :render-label="renderLabel" @update:value="handleSelect" />
                    </div>

                </n-tab-pane>
            </n-tabs>




            <div class="player">
                <AudioPlayer :audioSrc="selectedAudio.src" :audioTitle="selectedAudio.title"
                    :audioTitlePali="selectedAudio.paliTitle" :audioFullSrc="selectedAudio.fullSrc"
                    :audioMeta="selectedAudio.audiMeta" />
            </div>
        </div>
    </n-config-provider>
</template>

<script setup>
import { ref, h } from 'vue'
import { NMenu, NConfigProvider } from 'naive-ui'
import AudioPlayer from './components/AudioPlayer.vue'
import library from './data/library.json'
import libraryAbhidamma from './data/library-abhidamma.json'
import libraryUpadesa from './data/library-upadesa.json'
import { audios } from './data/audios'
import { buildMenuOptions, buildMenuOptions2 } from './functions/buildMenuOptions'

const selectedAudio = ref({ title: '', src: '', fullSrc: '', paliTitle: '' })

function handleSelect(key) {
    const item = flatItems.find(i => i.key === key)
    if (item?.audioSrc && audios[item.value]) {
        selectedAudio.value = {
            title: audios[item.value].sinhalaCaption,
            paliTitle: audios[item.value].paliCaption,
            src: audios[item.value].src,
            fullSrc: audios[item.value].fullAudioSrc,
            audiMeta: generateAudiMeta(audios[item.value].src)
        }

        console.log("selectedAudio>>>>>", selectedAudio);
    }
}

function generateAudiMeta(src) {

    // const audiMeta = {
    //     audiName: src.split("/")[3],
    //     cdNumber: Number(src.split("/")[3].split("-")[1].slice(-3)),
    //     audiNumber: Number(src.split("/")[3].split("-")[2])
    // }

    const audiMeta = {
        audiName: "Name",
        cdNumber: 10,
        audiNumber: 5
    }



    console.log(">>>AUDI META >>>>", audiMeta);

    return audiMeta;
}

const currentTab = ref('damma');

//dhamma library
let opt;
let flatItems;
let menuOptions;

handleTabSwitch('damma');

function handleTabSwitch(newTab) {
    console.log('Before switching to tab:', newTab)

    // Example: confirm navigation
    if (newTab === 'abidamma') {

        opt = buildMenuOptions2(libraryAbhidamma, audios);
        flatItems = opt.rootAudios;
        menuOptions = opt.menu;

        // You can also do async tasks here before switching
    } else if (newTab === 'upadesa') {
        opt = buildMenuOptions2(libraryUpadesa, audios);
        flatItems = opt.rootAudios;
        menuOptions = opt.menu;
    } else {
        opt = buildMenuOptions2(library, audios);
        flatItems = opt.rootAudios;
        menuOptions = opt.menu;
    }

    currentTab.value = newTab // Apply the actual switch
}


function renderLabel(option) {
    const isLeaf = !option.children;

    return h(
        'span',
        {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }
        },
        isLeaf
            ? [
                h('span', { style: { fontSize: '14px', color: 'blue' } }, '▷'), // play icon for leaf
                h('span', {}, option.label)
            ]
            : [
                h('span', { style: { fontSize: '14px', color: 'brown' } }, '🕮'), // book icon for parent
                h('span', {}, option.label)
            ]
    )
}

</script>

<style>
.container {
    display: flex;
    max-width: 1000px;
    margin: auto;
    padding: 20px;
    gap: 20px;
    /* background-color: bisque; */
}

.tree {
    /* width: 60%; */
    /* border-right: 1px solid #ccc; */
    padding-right: 20px;
}

.player {
    width: 150%;
    padding-left: 20px;
    border-left: 1px solid #ccc;
}

.n-menu {
    --n-item-height: 28px !important;
}
</style>
