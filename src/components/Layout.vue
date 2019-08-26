<template>
    <div id="content">
        <div class="intro row align-item-top align-items-md-center">
            <div class="col-md-8">
                <slot name="intro"></slot>
            </div>
            <div class="col-md-4 mt-1 mt-lg-0">
                <pre v-if="mode === 'lection'" v-highlightjs="sourcecodeGeneral"><code class="php light"></code></pre>
                <div v-else class="badges px-2">
                    <h4 class="mt-1 mb-1">Gelöste Aufgaben:</h4>
                    <router-link :to="route" v-for="(route, i) in routes" :id="route.slice(1) + '-badge'" class="badge" :class="{ active: badges.find(b => b === route.slice(1)) }" :key="i">{{ route.slice(1) }}</router-link>
                </div>
            </div>
        </div>

        <hr>
        <div v-show="mode === 'lection'" class="layout-wrapper row justify-content-between align-items-center align-items-md-stretch mt-5">
            <div class="description mb-3 order-0" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ? 'col-lg-4' : 'col-lg-3'">
                <h2>Das passiert:</h2>
                <div class="description-wrapper" :style="{ opacity: desktopViewport && theaterMode ? .3 : 1 }">
                    <slot name="desc"></slot>
                </div>
                <b-button variant="info" class="mt-4 mb-5 d-none d-lg-block" @click="switchMode">{{ mode === 'lection' ? 'Zum Quiz' : 'Zurück zur Lektion' }}</b-button>
            </div>

            <div class="animation" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ?  'col-lg-8' : 'col-lg-9'">
                <Animation :sourcecode="sourcecode" :animation="animation" :burger-animation="burgerAnimation" @theaterMode="theaterMode = $event" :people="people"></Animation>
                <b-button variant="info" class="mt-4 mb-5 d-lg-none" @click="switchMode">{{ mode === 'lection' ? 'Zum Quiz' : 'Zurück zur Lektion' }}</b-button>
            </div>
        </div>

        <div v-show="mode === 'quiz'" class="layout-wrapper row justify-content-between align-items-center align-items-md-stretch mt-5">
            <div class="task mb-3 order-2 order-lg-0" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ? 'col-lg-4' : 'col-lg-3'">
                <h2>Die Aufgabe:</h2>
                <div class="task-wrapper" :style="{ opacity: desktopViewport && theaterMode ? .3 : 1 }">
                    <slot name="task"></slot>
                </div>
                <b-button variant="info" class="mt-4 mb-5" @click="switchMode">{{ mode === 'lection' ? 'Zum Quiz' : 'Zurück zur Lektion' }}</b-button>
            </div>

            <div class="builder order-0 order-lg-2" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ?  'col-lg-8' : 'col-lg-9'">
                <Quiz :template="exercise" @addBadge="addBadge" @removeBadge="removeBadge"></Quiz>
            </div>
        </div>

        <div class="nav-buttons container">
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
    import Quiz from "./Quiz";

    export default {
        name: 'Layout',
        components: {Quiz, Animation},
        props: {
            sourcecodeGeneral: String,
            sourcecode: String,
            animation: Array,
            burgerAnimation: Array,
            exercise: Array,
            people: Array
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/array', '/for', '/hash', '/foreach' ],
                theaterMode: false,
                mode: '',
                badges: []
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
        },
        methods: {
            switchMode() {
                this.mode = this.mode === 'lection' ? 'quiz' : 'lection';
                window['layoutMode'] = this.mode;
                this.$cookie.set("layoutMode", this.mode, 180);
            },
            addBadge() {
                this.badges.push(this.$route.name);
                this.updateBadges();
            },
            removeBadge() {
                let index = this.badges.findIndex(badge => badge === this.$route.name);
                if (index >= 0) this.badges.splice(index, 1);
                this.updateBadges();
            },
            updateBadges() {
                window['badges'] = this.badges;
                this.$cookie.set("badges", JSON.stringify(this.badges), 180);
                document.dispatchEvent(new Event("badgesChange"));
            }
        },
        mounted() {
            if (!this.mode && this.$cookie.get("layoutMode")) this.mode = this.$cookie.get("layoutMode").replace(/"/g, "");
            else this.mode = window['layoutMode'] ? window['layoutMode'] : 'lection';

            setTimeout(() => {
                this.badges = window['badges'] ? window['badges'] : [];
            }, 300);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .layout-wrapper {
        position: relative;
    }

    .description, .task, .animation, .builder {
        position: relative;
        transition: opacity .3s, flex .3s, max-width .3s;
        min-height: 25rem;
    }
    .builder {
        min-height: auto;
    }

    .description-wrapper, .task-wrapper {
        background: $light;
        border-radius: 5px;
        padding: .5rem .9rem;
        box-shadow: $light-box-shadow;

        height: 22.5rem;
        overflow-y: auto;
        overflow-x: hidden;

        p:last-child {
            margin-bottom: 0;
        }

        scrollbar-color: $gray-300 $gray-200;
        scrollbar-width: thin;
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

    .nav-buttons {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 15;

        .nav-button {
            position: absolute;
            width: 1rem;
            height: 1rem;
            transition: opacity .3s;

            &.prev { left: -2rem; }
            &.next { right: -2rem; }

            [class*="slide-"] & {
                opacity: 0;
                transition: opacity .05s;
            }
        }
    }

    .intro {
        pre {
            scrollbar-color: $gray-500 $gray-400;
            scrollbar-width: thin;
            &::-webkit-scrollbar {
                height: 4px;
            }
            &::-webkit-scrollbar-track {
                background: $gray-400;
                border-radius: 0 $border-radius $border-radius 0;
            }
            &::-webkit-scrollbar-thumb {
                height: 4px;
                margin: 0 auto;
                background: $gray-500;
                border-radius: 0 $border-radius $border-radius 0;
                &:hover {
                    background: $gray-400;
                }
            }
        }
        pre, .badges {
            position: relative;
            height: 6rem;
            background: $light;
            border-radius: $border-radius;
            box-shadow: $light-box-shadow;
            overflow: auto;

            code {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                padding: 0 .5rem;
            }
        }
    }

    .badge {
        display: inline-block;
        margin: 0 .15rem .25rem;
        padding: .4rem .6rem .5rem;
        font-family: $font-family-monospace;
        font-weight: bold;
        color: $white;
        background: $gray-300;

        &.active {
            &#if-badge { background: $blue; }
            &#while-badge { background: $yellow;; }
            &#do-while-badge { background: $indigo; }
            &#array-badge { background: $pink; }
            &#for-badge { background: $green; }
            &#hash-badge { background: $orange; }
            &#foreach-badge { background: $cyan; }
        }
    }

    @include media-breakpoint-down('lg') {
        .nav-buttons {
            top: calc(50% - 3rem);
        }
    }
    @include media-breakpoint-down('md') {
        .nav-button {
            position: fixed;
            top: calc(50%);
            transition: opacity .3s;

            &.prev { left: 1rem; }
            &.next { right: 1rem; }

            [class*="slide-"] & {
                opacity: 0;
                transition: opacity .05s;
            }
        }
        .badge {
            display: inline-block;
            margin: 0 .15rem;
            padding: .2rem .3rem .3rem;
        }
        .description, .animation {
            min-height: unset;
            h2 {
                margin-bottom: 1rem;
            }
        }
        .animation, .builder {
            padding: 0 1.7rem;
        }
        .builder {
            padding-bottom: 3rem;
        }
        .description-wrapper {
            height: unset;
        }
    }
</style>