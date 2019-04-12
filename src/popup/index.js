import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)
import App from './App.vue'
import {
    Input
} from 'buefy/dist/components/input'
Vue.component('b-input', Input)

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(Element)






// eslint-disable-next-line
new Vue({
    el: "#app",
    data: {
        message: 2222
    },
    render: h => h(App)
})
