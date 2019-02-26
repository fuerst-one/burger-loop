<template>
    <div id="content">
        <div class="intro row align-item-top align-items-md-center">
            <div class="col-md-8">
                <slot name="intro"></slot>
            </div>
            <div class="col-md-4 mt-1 mt-lg-0">
                <pre v-highlightjs="sourcecodeGeneral"><code class="php light"></code></pre>
            </div>
        </div>

        <hr>
        <div class="layout-wrapper row justify-content-between align-items-center align-items-md-stretch mt-5">
            <div class="description mb-3 order-0" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ? 'col-lg-4' : 'col-lg-3'">
                <h2>Das passiert:</h2>
                <div class="description-wrapper" :style="{ opacity: desktopViewport && theaterMode ? .3 : 1 }">
                    <slot name="desc"></slot>
                </div>
            </div>

            <div class="animation" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ?  'col-lg-8' : 'col-lg-9'">
                <Animation :sourcecode="sourcecode" :animation="animation" :burger-animation="burgerAnimation" @theaterMode="theaterMode = $event"></Animation>
            </div>

            <div class="nav-button prev d-none d-sm-block">
                <router-link :to="prevRoute">
                    <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#aaa" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path></svg>
                </router-link>
            </div>
            <div class="nav-button next d-none d-sm-block">
                <router-link :to="nextRoute">
                    <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#aaa" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import Animation from "./Animation";

    export default {
        name: 'Layout',
        components: {Animation},
        props: {
            sourcecodeGeneral: String,
            sourcecode: String,
            animation: Array,
            burgerAnimation: Array
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/for', '/foreach' ],
                theaterMode: false
            }
        },
        computed: {
            activeRoute() {
                return this.routes.findIndex(r => r === this.$route.path);
            },
            prevRoute() {
                return this.routes[this.activeRoute === 0 ? this.routes.length : this.activeRoute - 1] || '/';
            },
            nextRoute() {
                return this.routes[this.activeRoute === this.routes.length ? 0 : this.activeRoute + 1] || '/';
            },
            desktopViewport() {
                return window.innerWidth > 991;
            },
            hideBurgerOnIdle() {
                return window.hideBurgerOnIdle;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .layout-wrapper {
        position: relative;
    }

    .description, .animation {
        position: relative;
        transition: opacity .3s, flex .3s, max-width .3s;
        min-height: 25rem;
    }

    .description-wrapper {
        background: $light;
        border-radius: 5px;
        padding: .5rem .8rem;

        height: 22.5rem;
        overflow-y: scroll;
        overflow-x: hidden;

        p:last-child {
            margin-bottom: 0;
        }

        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-track {
            background: $gray-200;
            border-radius: 0 5px 5px 0;
        }
        &::-webkit-scrollbar-thumb {
            width: 8px;
            margin: 0 auto;
            background: $gray-300;
            border-radius: 0 5px 5px 0;
            &:hover {
                background: $gray-400;
            }
        }
    }

    .nav-button {
        position: absolute;
        top: .1rem;
        width: 1rem;
        height: 1rem;

        &.prev {
            left: -2rem;
        }
        &.next {
            right: -2rem;
        }
    }

    .intro {
        pre {
            position: relative;
            height: 6rem;
            background: $light;
            border-radius: $border-radius;
            overflow-x: auto;

            code {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                overflow-x: visible;
                padding: 0 .5rem;
            }
        }
    }

    @include media-breakpoint-down('lg') {
        .nav-button {
            &.prev { left: -1rem; }
            &.next { right: -1rem; }
        }
    }
    @include media-breakpoint-down('md') {
        .description, .animation {
            min-height: unset;
            h2 {
                margin-bottom: 1rem;
            }
        }
        .description-wrapper {
            height: unset;
        }
    }
</style>