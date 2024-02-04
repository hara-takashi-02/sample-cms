import { createApp } from 'vue';

import router from './router';
import shopList from './store';

require('./bootstrap');

const app = createApp({
    components: {
    }
})
    .use(shopList)
    .use(router)
    .mount('#app');