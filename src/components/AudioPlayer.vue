<template>
    <div v-if="audioSrc">
        <h2 style="margin-bottom: 0px;">{{ audioTitle }}</h2>
        <small style="color: gray;">{{ audioMeta.audiName }}</small>
        <br><br>

        <!-- Cut audio player -->
        <audio :src="audioSrc" controls style="width: 100%"></audio>

        <n-collapse>
            <n-collapse-item title="Double Check Audio" name="1">
                <audio ref="cutAudioRef" :src="audioFullSrc" controls style="width: 100%" @timeupdate="onTimeUpdate"
                    @loadedmetadata="onLoadedMetadata"></audio>
            </n-collapse-item>
        </n-collapse>

    </div>

    <div v-if="audioFullSrc">
        <h2 style="margin-bottom: 0px;">විස්තර</h2>
        <p style="margin-top: 0px;">
            මෙය දේශණයකින් උපුටා ගන්නා ලද කොටසක් වන අතර ඊට අදාල සමස්ථ මූල දේශණය
            වහරක හිමියන් වැඩ විසූ කල නිකුත් කළ එකසිය හයක් වූ CD තැටි වලින් ,
            <strong>CD අංක {{ audioMeta.cdNumber }} හි {{ audioMeta.audiNumber }} වැනි</strong> දේශණයයි.
            ඊට සවන් දීමට පහත අයිතමය භාවිත කරන්න.
        </p>
        <audio :src="audioFullSrc" controls style="width: 50%"></audio>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    audioSrc: String,
    audioFullSrc: String,
    audioTitle: String,
    audioTitlePali: String,
    audioMeta: {
        audiName: String,
        cdNumber: Number,
        audiNumber: Number
    }
})

const cutAudioRef = ref(null)

// 1. Parse start/end times from audiName
function parseTime(tag) {
    const match = props.audioMeta.audiName.match(new RegExp(`${tag}(\\d{2})-(\\d{2})-(\\d{2})`))
    if (!match) return 0
    const [, hh, mm, ss] = match.map(Number)
    return hh * 3600 + mm * 60 + ss
}

const startTime = computed(() => parseTime('S'))
const endTime = computed(() => parseTime('E'))

// 2. Seek to start when loaded
const onLoadedMetadata = () => {
    if (cutAudioRef.value) {
        cutAudioRef.value.currentTime = startTime.value
    }
}

// 3. Pause when reaching end
const onTimeUpdate = () => {
    const player = cutAudioRef.value
    if (player && player.currentTime >= endTime.value) {
        player.pause()
    }
}
</script>
