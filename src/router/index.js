import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
const Hello = resolve => require(['@/components/Hello'], resolve);
const Welcome = resolve => require(['@/components/Welcome'], resolve);

Vue.use(Router);

let router = new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    }]
});

export default router;
