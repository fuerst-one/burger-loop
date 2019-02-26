<template>
    <div class="row mt-3 mt-lg-0">

        <div class="tooltip-mobile col-9 col-md-6 order-1 order-md-2 mb-3 d-lg-none">
            <div class="tooltip bs-tooltip-top show" role="tooltip">
                <div class="arrow"></div>
                <div class="tooltip-inner">
                    <div>
                        <p v-if="theaterMode && activeLineMessage !== ''">{{ activeLineMessage }}</p>
                        <p v-else>Drücke auf &nbsp;<svg @click="play" height="17px" style="margin-bottom: 3px; cursor: pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#333" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>, um zu beginnen!</p>
                    </div>
                    <div v-if="animationInterval" class="dots">
                        <span>{{ tickTock }}</span>
                    </div>
                </div>
            </div>
        </div>

        <b-tooltip v-if="theaterMode && activeLineMessage !== ''" target="#line-indicator" :show="(desktopViewport || !theaterMode) && !blockTooltip" class="tooltip-desktop" placement="left">
            {{ activeLineMessage }}
        </b-tooltip>

        <div class="sourcecode order-3 order-md-0" :class="!hideBurgerOnIdle || theaterMode ? 'col-md-6' : 'col'">
            <h2 class="d-none d-md-block">Code:</h2>

            <div class="sourcecode-animation-wrapper row">

                <div class="source-code-animation-wrapper container-fluid">
                    <div class="row">

                        <div class="col-12 order-0 order-md-0 pl-4">
                            <Sourcecode :sourcecode="sourcecode" :sourcecode-animation-task="sourcecodeAnimationTask" :theater-mode="theaterMode"></Sourcecode>

                            <div v-if="!animationInterval && animationStep === animation.length-1 && !endScreenDismissed" class="end-screen">
                                <div @click="reset()" class="reset">
                                    <span>Zurück auf Anfang</span>
                                </div>
                                <router-link :to="nextRoute" class="next">
                                    <span>{{ nextRoute === '/' ? 'Fertig!' : nextRoute === '/if' ? 'Zur ersten Lektion!' : 'Zur nächsten Lektion' }}</span>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="progress">
                        <div class="progress-bar bg-primary" :style="{ width: ((animationStep + 1) / animation.length * 100) + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="controls col-12 col-md-6 order-4 order-md-2 mb-3">

            <div class="row justify-content-center">
                <b-button id="animation-far-prev" :disabled="animationStep === 0" @click="farPrevStep" variant="secondary" class="mr-2">
                    <svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="white" d="M20.2 247.5L167 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L85.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L184 412.5c-4.7 4.7-12.3 4.7-17 0l-146.8-148c-4.7-4.7-4.7-12.3 0-17zm160 17l146.8 148c4.7 4.7 12.3 4.7 17 0l19.8-19.8c4.7-4.7 4.7-12.3 0-17L245.3 256l118.5-119.7c4.7-4.7 4.7-12.3 0-17L344 99.5c-4.7-4.7-12.3-4.7-17 0l-146.8 148c-4.7 4.7-4.7 12.3 0 17z"></path></svg>
                </b-button>
                <b-button id="animation-prev" :disabled="animationStep === 0" @click="prevStep" variant="secondary">
                    <svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path></svg>
                </b-button>
                <b-button id="animation-play" :disabled="animationStep === animation.length-1" @click="togglePlay" :variant="animationInterval ? 'dark' : 'info'" class="mx-2">
                    <svg v-if="!animationInterval" height="17px" style="margin-bottom: 3px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                    <svg v-else height="17px" style="margin-bottom: 3px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>
                </b-button>
                <b-button id="animation-next" :disabled="animationStep === animation.length-1" @click="nextStep" variant="secondary" class="mr-2">
                    <svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                </b-button>
                <b-button id="animation-reset" :disabled="!theaterMode" @click="reset" variant="dark">
                    <svg width="17px" style="margin-bottom: 3px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>
                </b-button>

                <div class="w-100 mt-3"></div>

                <!-- Optional Design: Animation-Frequency-Slider-->
                <div id="animation-frequency-slider" v-if="animationFrequencySlider" class="col-auto">
                    <Slider @change="setAnimationFrequency($event)" :value="animationFrequencyIndex"></Slider>
                </div>
                <!-- Optional Design: Animation-Frequency-Buttons-->
                <div v-else class="col-auto">
                    <b-button :disabled="!animationInterval || animationFrequencyIndex === 0" @click="setAnimationFrequency(animationFrequencyIndex-1)" variant="light" class="mr-2">langsamer</b-button>
                    <b-button :disabled="!animationInterval || animationFrequencyIndex >= 2" @click="setAnimationFrequency(animationFrequencyIndex+1)" variant="light">schneller</b-button>
                </div>
            </div>
        </div>

        <div v-show="!hideBurgerOnIdle || theaterMode" class="burger col-3 col-md-6 order-2 order-md-1 mb-3">
            <h2 class="d-none d-md-block">Burger:</h2>
            <div class="burger-animation-wrapper">
                <Burger :burger-animation-task="burgerAnimationTask" @busy="busy = $event"></Burger>
            </div>
        </div>
    </div>
</template>

<script>
    import Burger from "./Burger";
    import Slider from "./Slider";
    import BButton from "bootstrap-vue/src/components/button/button";
    import Sourcecode from "./Sourcecode";
    import BTooltip from "bootstrap-vue/src/components/tooltip/tooltip";
    export default {
        name: 'Animation',
        components: {BTooltip, Sourcecode, BButton, Slider, Burger},
        props: {
            sourcecodeGeneral: String,
            sourcecode: String,
            animation: Array,
            burgerAnimation: Array
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/for', '/foreach' ],
                started: false,
                animationInterval: null,
                animationFrequencyIndex: process.env.NODE_ENV === 'development' ? 3 : 1,
                animationFrequencies: [ 3600, 1800, 600, 100 ],
                animationStep: 0,
                busy: false,
                endScreenDismissed: false,
                blockTooltip: true,
                tickTock: '.',
                tickTockInterval: null
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
            },
            animationFrequencySlider() {
                return window.animationFrequencySlider;
            },
            theaterMode() {
                this.$emit('theaterMode', !!this.animationInterval || this.animationStep > 0);
                return !!this.animationInterval || this.animationStep > 0;
            },
            activeLineMessage() {
                return this.animation[this.animationStep][3];
            },
            sourcecodeAnimationTask() {
                return this.animation[this.animationStep];
            },
            burgerAnimationTask() {
                if (this.animationStep === 0 && !this.started) {
                    return this.burgerAnimation[this.animation[this.animation.length - 1][2]]
                }
                return this.burgerAnimation[this.animation[this.animationStep][2]];
            }
        },
        watch: {
            animationStep(valAfter) {
                if (valAfter >= this.animation.length - 1) {
                    this.endScreenDismissed = false;
                    this.pause();
                } else if (valAfter === 0) {
                    this.reset();
                } else if (valAfter === 1 && this.blockTooltip) {
                    this.start();
                }
            }
        },
        methods: {
            start() {
                document.querySelectorAll('.burger-animation .in').forEach(obj => {
                    obj.className = 'layer out-right';
                    setTimeout(() => {
                        obj.className = 'layer';
                    }, 350);
                });

                if (this.blockTooltip) {
                    setTimeout(() => {
                        this.blockTooltip = false;
                    }, 350);
                }

                this.started = true;
            },
            reset() {
                this.pause();
                this.started = false;
                this.blockTooltip = true;
                this.endScreenDismissed = false;
                this.animationStep = 0;
                document.querySelectorAll('.burger-animation .layer').forEach(obj => {
                    obj.className = 'layer in';
                });
            },
            togglePlay() {
                if (!this.animationInterval) this.play();
                else this.pause();
            },
            play() {
                if (this.busy) return;

                this.animationInterval = true;

                this.animationStep++;

                if (this.animationStep === this.animation.length - 1) return;

                setTimeout(() => {
                    this.blockTooltip = false;

                    this.tickTock = '.';
                    this.tickTockInterval = setInterval(() => {
                        this.tickTock += '.'
                    }, this.animationFrequencies[this.animationFrequencyIndex] / 2);

                    this.animationInterval = setInterval(() => {
                        if (!this.busy) this.animationStep++;

                        clearInterval(this.tickTockInterval);
                        this.tickTock = '.';
                        this.tickTockInterval = setInterval(() => {
                            this.tickTock += '.'
                        }, this.animationFrequencies[this.animationFrequencyIndex] / 3);

                    }, this.animationFrequencies[this.animationFrequencyIndex]);

                }, this.theaterMode ? 350 : 0);
            },
            pause() {
                clearInterval(this.animationInterval);
                clearInterval(this.tickTockInterval);
                this.animationInterval = null;
            },
            farPrevStep() {
                this.pause();
                if (this.busy) return;

                let steps = this.animation;
                let temp = this.animationStep;

                if (steps[temp][0] !== steps[temp-1][0]) {
                    temp--;
                }
                while (temp > 1 && steps[temp][0] === steps[temp-1][0]) {
                    temp--;
                }

                this.animationStep = temp;
            },
            prevStep() {
                this.pause();
                if (this.busy) return;

                this.animationStep--;
            },
            nextStep() {
                this.pause();
                if (this.busy) return;

                this.animationStep++;
            },
            setAnimationFrequency(value) {
                this.animationFrequencyIndex = value;

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
                this.animationFrequencyIndex = parseInt(this.$cookie.get('animation-frequency'));
            }

            setTimeout(() => {
                this.busy = false;
            }, 120);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .sourcecode, .burger {
        position: relative;
        /*min-height: 25rem;*/
        transition: height .3s, opacity .3s, flex .3s, max-width .3s;

        h2 {
            margin-bottom: 1rem;
        }
    }

    .sourcecode-animation-wrapper {
        position: relative;


        .end-screen {
            position: absolute;
            top: 0;
            left: 1.5rem;
            right: calc(1rem - 1px);
            bottom: 1rem;
            border-radius: $border-radius;
            overflow: hidden;

            .next, .reset {
                display: block;
                position: relative;
                height: 50%;
                width: 100%;
                color: $white;
                text-align: center;
                font-size: 1.2rem;
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
                background: $primary;
            }

            .reset {
                background: $dark;
            }
        }
    }

    .burger-animation-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: .2rem;
        max-width: 315px;
        margin: 0 auto;
    }

    .tooltip-mobile {
        padding-left: 1.5rem;
        padding-right: 1rem;

        .tooltip {
            width: 100%;
            height: 100%;
            position: relative;

            .tooltip-inner {
                position: relative;
                width: 100%;
                max-width: 100%;
                height: 4rem;

                div {
                    height: 100%;
                }

                p {
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                    text-align: center;
                }
            }
            &:hover {
                opacity: 1;
            }

            .dots {
                position: absolute;
                top: 2.5rem;
                right: .5rem;
            }

            .arrow {
                left: 50%;
                top: unset;
                bottom: calc(100% - 6px);
                transform: rotateZ(180deg) translateX(50%);
            }
        }
    }

    .progress {
        position: relative;
        top: calc(-1rem - 5px);
        margin-left: 9px;
        height: 5px;
        border-radius: 0 0 5px 5px;
        background: transparent;
    }

    .controls {
        padding-left: 1.5rem;
    }

    @media screen and (max-width: 991px) {
        .burger {
            min-height: 22rem;
        }
        .burger-animation-wrapper {
            bottom: 1rem;
        }

        body > .tooltip.show {
            display: none !important;
        }
        .tooltip-mobile {
            width: auto;
            padding: 0 1rem 0 1.5rem;

            .tooltip {
                width: 100%;
                max-width: 100%;
                z-index: 0;

                &, .tooltip-inner {
                    height: 4rem;
                }
            }
        }
    }
    @media screen and (max-width: 767px) {
        .burger-animation-wrapper {
            bottom: -.2rem;
        }
        .burger {
            min-height: 5rem;
        }
        .tooltip-mobile {
            width: auto;
            padding: 0 1rem 0 1.5rem;

            .tooltip {
                width: 100%;
                max-width: 100%;
                z-index: 0;

                &, .tooltip-inner {
                    height: 4rem;
                }

                .arrow {
                    top: calc(100% + 6px);
                    bottom: unset;
                    transform: translateX(-50%);
                }
            }
        }
    }
    @media screen and (max-width: 575px) {
        .burger {
            margin-left: -0.4rem;
            margin-right: auto;
        }
        /*.tooltip-mobile {
            .tooltip-wrapper {
                margin-right: 0;
            }
        }*/
    }
</style>