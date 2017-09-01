<template>
    <div id="app">
        <swiper :options="mainSwiperCfg" ref="mainSwiper">
            <swiper-slide>
                <router-view class="content"></router-view>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    import Vue from 'vue';

    export default {
        components: {
            swiper,
            swiperSlide
        },
        name: 'app',
        computed: {
            mainSwiperCfg(){
                return {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true,
                    freeModeMomentumRatio : 0.5,
                    resistanceRatio: 0,
                    freeModeMomentumBounce: false,
                    onTouchMove: this.broadcastTouchMove
                }
            }
        },
        mounted(){
            let swiper = this.$refs.mainSwiper.swiper;
            Vue.$mainSwiper = Vue.prototype.$mainSwiper = swiper;
        },
        methods: {
            broadcastTouchMove: (function(){
                let timer = null;
                return function(swiper, e){
                    clearTimeout(timer);
                    timer = setTimeout(()=>{
                        window.EventBus.$emit('main-swiper-move', swiper, e);
                    }, 200);
                }
            })()
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #4a4a4a;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
        background: #fafafa;
    }
    .content {
        min-height: 100vh;
        width: 100%;
    }
    .swiper-container {
        width: 100%;
        height: 100%;
    }
</style>
