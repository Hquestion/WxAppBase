<template>
    <div class="entry">
        <header v-scroll-toggle>
            <nav>
                <ul>
                    <li :class="{active: focus==='Hot'}" id="Hot" @click="jump('Hot')">热点</li>
                    <li :class="{active: focus==='Hot'}" id="Analysis" @click="jump('Analysis')">分析</li>
                    <li :class="{active: focus==='Hot'}" id="Mine" @click="jump('Mine')">我的</li>
                </ul>
            </nav>
        </header>
        <section>
            <router-view></router-view>
        </section>
    </div>
</template>
<script>
    import scrollToggle from '../mixins/scrollToggle';
	export default {
		data() {
			return {
				msg: 'hello vue'
			}
		},
        mixins: [scrollToggle],
        computed: {
		    focus(){
		        return this.$route.meta.focusNav;
            }
        },
		components: {},
        methods: {
		    jump(menu){

            }
        }
	}
</script>
<style scoped>
    header {
        background: #fff;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.3rem;
        transition: top ease 0.2s;
    }
    header.fixed-nav {
        position: absolute;
        top: 0;
    }
    nav {
        display: block;
        height: 100%;
    }
    nav ul {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #f1f1f1;
    }
    nav ul li {
        flex: 1;
        position: relative;
    }
    nav ul li:after {
        content: '\20';
        display: block;
        position: absolute;
        width: 1px;
        height: 2rem;
        top: 0.5rem;
        right: 0;
        background: #efefef;
    }
    nav ul li:last-child:after {
        content: none;
    }
</style>
