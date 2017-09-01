import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
const Hello = resolve => require(['@/components/Hello'], resolve);
const Welcome = resolve => require(['@/components/Welcome'], resolve);
const Entry = resolve => require(['@/components/Entry'], resolve);

Vue.use(Router);

let router = new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Entry,
        children: [{
            path: '',
            name: 'HelloEntry',
            component: Hello,
            meta: {}
        }]
    }, {
        path: '/hello',
        name: 'Hello',
        component: Hello
    }, {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    }]
});

export default router;
