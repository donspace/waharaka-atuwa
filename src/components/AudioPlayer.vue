<template>
    <div v-if="audioSrc">
        <h2 style="margin-bottom: 0px;">{{ audioTitle }}</h2>
        <small style="color: gray;">{{ audioMeta.audiName }}</small>
        <br>
        <br>
        <audio :src="audioSrc" controls style="width: 100%"></audio>
    </div>



    <div v-if="audioFullSrc">
        <h2 style="margin-bottom: 0px;"> විස්තර </h2>
        <p style="margin-top: 0px;">
            මෙය දේශණයකින් උපුටා ගන්නා ලද කොටසක් වන අතර ඊට අදාල සමස්ථ මූල දේශණය
            වහරක හිමියන් වැඩ විසූ කල නිකුත් කළ එකසිය හයක් වූ CD තැටි වලින් ,
            <strong>CD අංක{{ audioMeta.cdNumber }} හි {{ audioMeta.audiNumber }} වැනි</strong> දේශණයයි.
            ඊට සවන් දීමට පහත අයිතමය භාවිත කරන්න.
        </p>
        <audio :src="audioFullSrc" controls style="width: 50% "></audio>
    </div>


    <!-- <n-card title="External Page">
        <iframe src="https://tipitaka.lk/sn-4-1-5-1/pali" width="100%" height="500" style="border: none"></iframe>
    </n-card> -->


</template>

<script setup>



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


</script>
