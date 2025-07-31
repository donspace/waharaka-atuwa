import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//import { create, NButton, NSpace } from 'naive-ui'
import NaiveUI from 'naive-ui'
//import { FlashOutline } from 'xicons'

/**
 * Prepare other dependancies
 */
// const naiveElements = create({
//     components: [NButton, NSpace]
// })


/**
 * Create vue app and inject dependancies andW mount
 */
const createVuedApp = createApp(App);
createVuedApp.use(NaiveUI);

createVuedApp.mount('#app')

