<template>
    <div id="content">
        <hr>
        <div class="layout-wrapper row justify-content-between align-items-center align-items-md-stretch mt-5">

            <div class="description mb-3 order-0" :class="!theaterMode ? 'col-lg-4' : 'col-lg-3'">
                <h2>Das passiert:</h2>
                <div class="description-wrapper" :style="{ opacity: desktopViewport && theaterMode ? .3 : 1 }">
                    <slot name="desc"></slot>
                </div>
            </div>

            <div class="tooltip-mobile col-9 order-1 d-md-none mb-3">
                <div class="tooltip-wrapper">
                    <p v-if="theaterMode && activeLineMessage !== ''">{{ activeLineMessage }}</p>
                    <p v-else>Drücke unten auf "Play", um zu beginnen!</p>
                </div>
            </div>

            <div class="sourcecode col-md-6 order-3 order-md-1 mb-3" :class="!theaterMode ?  'col-lg-4' : 'col-lg-5'">
                <h2 class="d-none d-md-block">Code:</h2>

                <div class="sourcecode-animation-wrapper row">

                    <div class="source-code-animation-wrapper container-fluid">
                        <div class="row">
                            <div class="tooltip-tablet col-12 d-none d-md-block d-lg-none order-1 order-md-1 mb-3">
                                <div class="tooltip-wrapper">
                                    <p v-if="theaterMode && activeLineMessage !== ''">{{ activeLineMessage }}</p>
                                    <p v-else>Drücke unten auf "Play", um zu beginnen!</p>
                                </div>
                            </div>

                            <div class="col-12 order-0 order-md-0 pl-4">
                                <Sourcecode :sourcecode="sourcecode" :sourcecode-animation-task="sourcecodeAnimationTask" :theater-mode="theaterMode" :block-view="blockTooltip"></Sourcecode>

                                <div v-if="!playing && animationStep === animation.length-1 && !endScreenDismissed" class="end-screen">
                                    <div @click="endScreenDismissed = true" class="reset">
                                        <span>Zurück zum Code.</span>
                                    </div>
                                    <router-link :to="nextRoute" class="next">
                                        <span>Zur nächsten Seite!</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="controls col-12 order-2 order-md-1 mb-3">
                        <div class="row justify-content-center">
                            <b-button :disabled="animationStep === 0" @click="farPrevStep" variant="secondary" class="mr-2"><svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="white" d="M20.2 247.5L167 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L85.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L184 412.5c-4.7 4.7-12.3 4.7-17 0l-146.8-148c-4.7-4.7-4.7-12.3 0-17zm160 17l146.8 148c4.7 4.7 12.3 4.7 17 0l19.8-19.8c4.7-4.7 4.7-12.3 0-17L245.3 256l118.5-119.7c4.7-4.7 4.7-12.3 0-17L344 99.5c-4.7-4.7-12.3-4.7-17 0l-146.8 148c-4.7 4.7-4.7 12.3 0 17z"></path></svg></b-button>
                            <b-button :disabled="animationStep === 0" @click="prevStep" variant="secondary"><svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path></svg></b-button>
                            <b-button :disabled="animationStep === animation.length-1" @click="togglePlay" :variant="animationInterval ? 'warning' : 'success'" class="mx-2">{{ animationInterval ? 'Pause' : 'Play' }}</b-button>
                            <b-button :disabled="animationStep === animation.length-1" @click="nextStep" variant="secondary" class="mr-2"><svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg></b-button>
                            <b-button :disabled="!theaterMode" @click="reset" variant="dark">Reset</b-button>

                            <div class="w-100 mt-3"></div>

                            <b-button :disabled="!animationInterval || animationStep === animation.length-1 || animationFrequencyIndex === 0" @click="setAnimationFrequency(-1)" variant="light" class="mr-2">langsamer</b-button>
                            <b-button :disabled="!animationInterval || animationStep === animation.length-1 || animationFrequencyIndex === 2" @click="setAnimationFrequency(1)" variant="light">schneller</b-button>

                            <!-- Optional Design: Animation-Frequency-Slider
                            <Slider @change="setAnimationFrequency($event)" :value="animationFrequencyIndex"></Slider>-->
                        </div>
                    </div>
                </div>
            </div>

            <div class="burger col-3 col-md-6 col-lg-4 order-2 order-md-2 mb-3">
                <h2 class="d-none d-md-block">Burger:</h2>
                <div class="burger-animation-wrapper">
                    <Burger :burger-animation-task="burgerAnimationTask"></Burger>
                </div>
            </div>

            <div class="nav-button prev d-none d-md-block">
                <router-link :to="prevRoute">
                    <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#aaa" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path></svg>
                </router-link>
            </div>
            <div class="nav-button next d-none d-md-block">
                <router-link :to="nextRoute">
                    <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#aaa" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import BButton from "bootstrap-vue/src/components/button/button";
    import Slider from "./Slider";
    import Burger from "./Burger";
    import Sourcecode from "./Sourcecode";
    export default {
        name: 'Layout',
        components: {Sourcecode, Burger, Slider, BButton},
        props: {
            sourcecode: String,
            animation: Array,
            burgerAnimation: Array
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/for', '/foreach' ],
                started: false,
                playing: false,
                animationInterval: null,
                animationFrequencyIndex: process.env.NODE_ENV === 'development' ? 3 : 1,
                animationFrequencies: [ 3600, 1800, 600, 100 ],
                animationStep: 0,
                busy: false,
                endScreenDismissed: false,
                blockTooltip: true
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
            theaterMode() {
                return this.playing || this.animationStep > 0;
            },
            activeLineMessage() {
                return this.animation[this.animationStep][3];
            },
            sourcecodeAnimationTask() {
                return this.animation[this.animationStep] ? this.animation[this.animationStep] : [0,0,0,'']
            },
            burgerAnimationTask() {
                if (this.animationStep === 0 && !this.started) {
                    return this.burgerAnimation[this.animation[this.animation.length - 1][2]]
                }
                return this.burgerAnimation[this.animation[this.animationStep][2]];
            }
        },
        methods: {
            togglePlay() {
                if (!this.playing || !this.animationInterval) this.play();
                else this.pause();
            },
            start() {
                document.querySelectorAll('.burger-animation .in').forEach(obj => {
                    obj.className = 'layer out-right';
                    setTimeout(() => {
                        obj.className = 'layer';
                    }, 350);
                });

                this.endScreenDismissed = false;
                this.started = true;
            },
            play() {
                if (this.busy) return;

                this.playing = true;

                if (!this.started) {
                    this.start();
                }
                setTimeout(() => {
                    this.blockTooltip = false;

                    this.animationInterval = setInterval(() => {
                        this.animationStep = this.animationStep + 1;
                        if (this.animationStep === this.animation.length - 1) {
                            this.pause();
                        }
                    }, this.animationFrequencies[this.animationFrequencyIndex]);
                }, 350);
            },
            pause() {
                this.playing = false;
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            },
            reset() {
                this.pause();
                this.started = false;
                this.blockTooltip = true;
                this.animationStep = 0;
                document.querySelectorAll('.burger-animation .layer').forEach(obj => {
                    obj.className = 'layer in';
                });
            },
            farPrevStep() {
                this.pause();
                if (this.busy) return;

                let steps = this.animation;
                let temp = this.animationStep;

                if (steps[temp][2] !== steps[temp-1][2]) {
                    this.animationStep = temp - 1;
                    return
                }

                while (temp > 0 && steps[temp][2] === steps[temp-1][2]) {
                    temp--;
                }
                this.animationStep = temp;

                if (this.animationStep === 0) this.reset();
            },
            prevStep() {
                this.pause();
                if (this.busy) return;

                this.animationStep--;

                if (this.animationStep === 0) this.reset();
            },
            nextStep() {
                if (this.busy) return;
                if (this.animationInterval) this.pause();

                if (!this.started) this.start();

                if (!this.playing && this.animationStep === 0) {
                    this.playing = true;
                    setTimeout(() => {
                        this.blockTooltip = false;
                    }, 350);
                    return;
                }
                this.animationStep++;

                if (this.animationStep === this.animation.length-1) {
                    this.endScreenDismissed = false;
                    this.pause();
                }
            },
            setAnimationFrequency(value) {
                this.animationFrequencyIndex += value;

                this.$cookie.set('animation-frequency', this.animationFrequencyIndex, 365);
                console.log('animationFrequency set to ' + this.animationFrequencies[this.animationFrequencyIndex] + 'ms');

                if (this.animationInterval) {
                    this.pause();
                    this.play();
                }
            }
        },
        mounted() {
            this.busy = true;

            if (this.$cookie.get('animation-frequency') && process.env.NODE_ENV !== 'development') {
                this.animationFrequencyIndex = this.$cookie.get('animation-frequency');
            }

            setTimeout(() => {
                this.busy = false;
            }, 120);
        }
    }
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        position: relative;
    }

    .description, .sourcecode, .burger {
        position: relative;
        transition: opacity .3s, flex .3s, max-width .3s;
        min-height: 35rem;
    }

    .description-wrapper {
        background: #fafafa;
        border-radius: 5px;
        padding: .5rem .8rem;

        height: 27rem;
        overflow: scroll;

        p:last-child {
            margin-bottom: 0;
        }
    }

    .sourcecode-animation-wrapper {
        position: relative;


        .end-screen {
            position: absolute;
            top: 0;
            left: 1.5rem;
            right: 1rem;
            bottom: 1rem;
            border-radius: 5px;
            overflow: hidden;

            .next, .reset {
                display: block;
                position: relative;
                height: 50%;
                width: 100%;
                color: white;
                text-align: center;
                font-size: 1.3rem;
                font-weight: 500;
                cursor: pointer;
                opacity: .9;

                transition: opacity .3s;

                span {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    transform: translateY(-50%);
                }

                &:hover {
                    opacity: 1;
                    text-decoration: underline;
                }
            }

            .next {
                background: #007bff;
            }

            .reset {
                background: #333;
            }
        }
    }

    .burger-animation-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 8.65rem;
        max-width: 315px;
        margin: 0 auto;
    }

    .nav-button {
        position: absolute;
        top: .1rem;
        width: 1rem;
        height: 1rem;

        &.prev {
            left: -1rem;
        }
        &.next {
            right: -1rem;
        }
    }

    @media screen and (max-width: 991px) {
        .description, .sourcecode, .burger {
            min-height: unset;
        }
        .description-wrapper {
            height: unset;
        }
        .burger {
            min-height: 30rem;
        }
        .burger-animation-wrapper {
            bottom: 8rem;
        }

        body > .tooltip.show {
            display: none !important;
        }
        .tooltip-tablet {
            text-align: center;
            vertical-align: middle;
            margin-bottom: .5rem;
            padding-left: 1.5rem;
            padding-right: 3.2rem;
            width: auto;

            .tooltip-wrapper {
                height: 3.5rem;
                background: #eee;
                border-radius: 5px;
                margin-right: -4vw;

                p {
                    width: auto;
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 0 .5rem;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .burger-animation-wrapper {
            bottom: -.2rem;
        }
        .burger {
            min-height: 5rem;
        }
        .tooltip-mobile {
            text-align: center;
            vertical-align: middle;
            margin-bottom: .5rem;
            padding-left: 1rem;
            padding-right: 4vw;
            width: auto;

            .tooltip-wrapper {
                height: 4.5rem;
                background: #eee;
                border-radius: 5px;
                margin-right: -4vw;

                p {
                    padding: 0 .5rem;
                    width: auto;
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    @media screen and (max-width: 576px) {
        .burger {
            margin-left: -0.4rem;
            margin-right: auto;
        }
        .tooltip-mobile {
            .tooltip-wrapper {
                margin-right: 0;
            }
        }
    }
</style>