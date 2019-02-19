<template>
    <div>
        <hr>
        <div class="row justify-content-between align-items-stretch mt-5">

            <div class="desc col-lg-4 mb-3 order-0" :style="{ opacity: desktopViewport && theaterMode ? .3 : 1 }">
                <h2>Erklärung:</h2>
                <slot name="desc"></slot>
            </div>

            <div class="code col-md-6 col-lg-4 order-2 order-sm-2 order-md-1 mb-3">
                <h2 class="d-none d-md-block">Code:</h2>

                <div class="row">
                    <div class="col-12 order-1 order-md-0 pl-4">
                        <div class="code-wrapper">
                            <pre v-highlightjs="sourcecode"><code class="php"></code></pre>
                            <div v-show="theaterMode" id="line-indicator" class="line-indicator" :style="{ top: indicatorPosition }">
                                <div v-if="activeLineStatus === 0" class="dot"></div>
                                <div v-if="activeLineStatus === 1" class="question">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill="#007bff" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"/>
                                    </svg>
                                </div>
                                <div v-if="activeLineStatus === 2" class="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#28a745" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
                                    </svg>
                                </div>
                                <div v-if="activeLineStatus === 3" class="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path fill="#dc3545" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                                    </svg>
                                </div>

                                <b-tooltip v-if="theaterMode && activeLineMessage !== ''" target="#line-indicator" :show="desktopViewport" delay="150" placement="left">
                                    {{ activeLineMessage }}
                                </b-tooltip>
                            </div>
                            <div v-show="theaterMode" class="line-outline" :style="{ top: indicatorPosition }"></div>
                        </div>
                    </div>

                    <div class="message-mobile col-12 d-lg-none order-0 mb-3">
                        <p v-if="theaterMode && activeLineMessage !== ''">{{ activeLineMessage }}</p>
                        <p v-else>Drücke unten auf "Play", um zu beginnen!</p>
                    </div>

                    <div class="controls col-12 order-2 order-md-1 mb-3">
                        <div class="row justify-content-center">
                            <b-button v-if="animationStep === animation.length-1 && nextRoute !== '/'" :to="nextRoute" variant="primary">Zur nächsten Seite!</b-button>

                            <div class="w-100 mb-3"></div>

                            <b-button :disabled="animationStep === 0" @click="prevStep" variant="secondary"><svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"/></svg></b-button>
                            <b-button :disabled="animationStep === animation.length-1" @click="togglePlay" :variant="animationInterval ? 'warning' : 'success'" class="mx-2">{{ animationInterval ? 'Pause' : 'Play' }}</b-button>
                            <b-button :disabled="animationStep === animation.length-1" @click="nextStep" variant="secondary" class="mr-2"><svg height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"/></svg></b-button>
                            <b-button :disabled="!theaterMode" @click="reset" variant="dark">Reset</b-button>

                            <div class="w-100 mt-3"></div>

                            <b-button :disabled="!animationInterval || animationStep === animation.length-1 || animationSpeed >= 4000" @click="playSlower" variant="light" class="mr-2">langsamer</b-button>
                            <b-button :disabled="!animationInterval || animationStep === animation.length-1 || animationSpeed <= 500" @click="playFaster" variant="light">schneller</b-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="anim col-md-6 col-lg-4 order-1 order-sm-1 order-md-2 mb-3" v-show="desktopViewport || theaterMode">
                <h2>Burger:</h2>
                <div class="burger-animation-wrapper">
                    <div class="burger-animation">
                        <div id="topBun" class="layer in"><img src="../assets/img/burger/topBun.svg" alt=""></div>
                        <div id="sauce" class="layer in"><img src="../assets/img/burger/sauce.svg" alt=""></div>
                        <div id="cheese3" class="layer in"><img src="../assets/img/burger/cheese3.svg" alt=""></div>
                        <div id="cheese2" class="layer in"><img src="../assets/img/burger/cheese2.svg" alt=""></div>
                        <div id="cheese1" class="layer in"><img src="../assets/img/burger/cheese.svg" alt=""></div>
                        <div id="tomatoes" class="layer in"><img src="../assets/img/burger/tomatoes.svg" alt=""></div>
                        <div id="salad" class="layer in"><img src="../assets/img/burger/salad.svg" alt=""></div>
                        <div id="patty" class="layer in"><img src="../assets/img/burger/patty.svg" alt=""></div>
                        <div id="bottomBun" class="layer in"><img src="../assets/img/burger/bottomBun.svg" alt=""></div>
                    </div>
                </div>
            </div>

            <div class="nav-button prev d-none d-md-block">
                <router-link :to="prevRoute">
                    <img src="../assets/img/angle-left.svg" alt="" class="img-fluid">
                </router-link>
            </div>
            <div class="nav-button next d-none d-md-block">
                <router-link :to="nextRoute">
                    <img src="../assets/img/angle-right.svg" alt="" class="img-fluid">
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import BButton from "bootstrap-vue/src/components/button/button";
    import BTooltip from "bootstrap-vue/src/components/tooltip/tooltip";
    export default {
        name: 'Layout',
        components: {BTooltip, BButton},
        directives: {},
        props: {
            sourcecode: String,
            animation: Array,
            burgerAnimation: Array
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/for', '/foreach' ],
                playing: false,
                animationInterval: null,
                animationSpeed: 2000,
                animationStep: 0,
                init: false
            }
        },
        computed: {
            desktopViewport() {
                return window.innerWidth > 991;
            },
            activeLine() {
                return this.animation[this.animationStep][0];
            },
            activeLineStatus() {
                return this.animation[this.animationStep][1];
            },
            activeLineMessage() {
                return this.animation[this.animationStep][3];
            },
            indicatorPosition() {
                return .5 + this.activeLine * 1.125 + 'rem';
            },
            theaterMode() {
                return this.playing || this.animationStep > 0;
            },
            activeRoute() {
                return this.routes.findIndex(r => r === this.$route.path);
            },
            prevRoute() {
                return this.routes[this.activeRoute === 0 ? this.routes.length : this.activeRoute - 1] || '/';
            },
            nextRoute() {
                return this.routes[this.activeRoute === this.routes.length ? 0 : this.activeRoute + 1] || '/';
            },
        },
        watch: {
            animationStep(nextStep, prevStep) {
                if (this.animation[nextStep][2] !== this.animation[prevStep][2])
                    this.animate(this.burgerAnimation[this.animation[nextStep][2]]);
            },
        },
        methods: {
            togglePlay() {
                if (!this.playing || !this.animationInterval) this.play();
                else this.pause();
            },
            play() {
                this.playing = true;

                if (!this.init) {
                    document.querySelectorAll('.burger-animation .in').forEach(obj => {
                        obj.className = 'layer out-right';
                        setTimeout(() => {
                            obj.className = 'layer';
                        }, 350);
                    });
                    this.init = true;
                }
                this.animationInterval = setInterval(() => {
                    this.animationStep = this.animationStep + 1;
                    if (this.animationStep === this.animation.length - 1) {
                        this.pause();
                    }
                }, this.animationSpeed);
            },
            pause() {
                this.playing = false;
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            },
            reset() {
                this.pause();
                this.animationStep = 0;
                this.init = false;
                document.querySelectorAll('.burger-animation .layer').forEach(obj => {
                    obj.className = 'layer in';
                });
            },
            prevStep() {
                this.pause();
                this.animationStep = this.animationStep === 0 ? (this.animation.length - 2) : (this.animationStep - 1);
            },
            nextStep() {
                if (this.animationInterval) this.pause();

                if (!this.init) {
                    document.querySelectorAll('.burger-animation .in').forEach(obj => {
                        obj.className = 'layer out-right';
                        setTimeout(() => {
                            obj.className = 'layer';
                        }, 350);
                    });
                    this.init = true;
                }

                if (!this.playing && this.animationStep === 0) {
                    this.playing = true;
                    return;
                }
                this.animationStep = (this.animationStep + 1) % this.animation.length;
            },
            playFaster() {
                this.animationSpeed /= 2;
                this.pause();
                this.play();
            },
            playSlower() {
                this.animationSpeed *= 2;
                this.pause();
                this.play();
            },
            animate(animationTask) {
                if (animationTask.length === 0) {
                    document.querySelectorAll('.burger-animation .in').forEach(obj => {
                        obj.className = 'layer out-right';
                        setTimeout(() => {
                            obj.className = 'layer';
                        }, 350);
                    });
                    return;
                }

                let visibleObjs = Object.values(document.querySelectorAll('.burger-animation .in')).map(obj => obj.id);
                let entering = [];
                let leaving = visibleObjs.filter(oldObj => !animationTask.find(obj => obj === oldObj));

                animationTask.forEach(newObj => {
                    if (!visibleObjs.find(obj => obj === newObj)) {
                        entering.push(newObj);
                    }
                });

                let delay = (this.animationSpeed - 100) / entering.length;
                let count = 0;

                entering.forEach(obj => {
                    setTimeout(() => {
                        document.getElementById(obj).className = 'layer in';
                    }, delay * count);
                    count++;
                });

                count = 0;

                leaving.forEach(obj => {
                    setTimeout(() => {
                        document.getElementById(obj).className = 'layer out';
                        setTimeout(() => {
                            document.getElementById(obj).className = 'layer';
                        }, 350);
                    }, delay * count);
                    count++;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .desc, .code, .anim {
        position: relative;
        transition: opacity .3s;
        min-height: 50vh;
    }
    .nav-button {
        position: absolute;
        top: 50%;
        width: 1rem;
        height: 1rem;

        &.prev {
            left: 2rem;
        }
        &.next {
            right: 2rem;
        }
    }

    .code-wrapper {
        position: relative;

        $size: 1.3rem;

        .line-indicator {
            position: absolute;
            top: .5rem;
            left: -$size;
            width: $size;
            height: $size;
            margin-top: -($size - 1.13)/2;
            pointer-events: none;

            .dot, .true, .false {
                display: block;
                border-radius: 100%;
            }
            .true, .false, .question {
                svg {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .false {
                width: 320/512 * 1rem;
            }
            .dot {
                margin: 16.6%;
                width: 66%;
                height: 66%;
                background: #007bff;
            }
        }
        .line-outline {
            position: absolute;
            top: .5rem;
            left: 0;
            right: 0;
            height: $size + .25rem;
            margin-top: -($size - 0.65)/2;
            background: rgba(0,0,0,.2);
        }
    }
    .message-mobile {
        height: 3.5rem;
        background: #eee;
        border-radius: 5px;
        text-align: center;
        vertical-align: middle;
        margin-bottom: .5rem;

        p {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .burger-animation-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 8rem;
        width: 315px;
        margin: 0 auto;
    }

    .burger-animation {
        #topBun {
            &.in, &.out, &.out-right {
                height: 6.6rem;
                width: 97%;
                z-index: 6;
            }
        }
        #sauce {
            &.in, &.out, &.out-right {
                height: .6rem;
                width: 58%;
                z-index: 5;
            }
        }
        #cheese3 {
            &.in, &.out, &.out-right {
                height: 1rem;
                width: 94%;
                z-index: 4;
            }
        }
        #cheese2 {
            &.in, &.out, &.out-right {
                height: 1rem;
                width: 93%;
                z-index: 3;
            }
        }
        #cheese1 {
            &.in, &.out, &.out-right {
                height: 1rem;
                width: 95%;
                z-index: 2;
            }
        }
        #tomatoes {
            &.in, &.out, &.out-right {
                height: 1.1rem;
                width: 88%;
                z-index: 1;
            }
        }
        #salad {
            &.in, &.out, &.out-right {
                height: 1rem;
                width: 100%;
                z-index: 1;
            }
        }
        #patty {
            &.in, &.out, &.out-right {
                height: 2.5rem;
                width: 95%;
                z-index: 0;
            }
        }
        #bottomBun {
            &.in, &.out, &.out-right {
                height: auto;
                width: 100%;
                z-index: 0;
            }
        }

        .layer {
            position: relative;
            margin: 0 auto;
            transition: top .3s, transform .3s, opacity .3s, height .1s;
            opacity: 0;
            height: 0;
            top: -1rem;
            max-width: 100%;
            transform: none;

            img {
                text-align: center;
                margin: 0 auto;
            }

            &.in {
                opacity: 1;
                height: auto;
                top: 0;
                transform: none;
            }

            &.out {
                top: -1rem;
                height: auto;
                opacity: 0;
            }
            &.out-right {
                top: 0;
                height: auto;
                opacity: 0;
                transform: translateX(50%);
            }
        }
    }

    @media screen and (max-width: 991px) {
        .desc, .code, .anim {
            min-height: unset;
        }
        .burger-animation-wrapper {
            bottom: 13rem;
        }
    }
    @media screen and (max-width: 768px) {
        .anim {
            min-height: 21rem;
        }
        .burger-animation-wrapper {
            bottom: 0;
        }
    }
</style>