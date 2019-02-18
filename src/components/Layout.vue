<template>
    <div>
        <hr>
        <div class="row justify-content-between mt-5">
            <div class="desc col-md-4 mb-3 order-0" :style="{ opacity: theaterMode ? .3 : 1 }">
                <h2>Erklärung:</h2>
                <slot name="desc"></slot>
            </div>
            <div class="code col-md-4 order-2 order-md-1 mb-3 pl-4 pl-md-0">
                <h2 class="d-none d-md-block">Code:</h2>

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

                        <b-tooltip
                                v-if="theaterMode && activeLineMessage !== ''"
                                target="#line-indicator"
                                :show="desktopViewport"
                                delay="150"
                                placement="left"
                        >
                            {{ activeLineMessage }}
                        </b-tooltip>
                    </div>
                    <div v-show="theaterMode" class="line-outline" :style="{ top: indicatorPosition }"></div>
                </div>

                <div class="row justify-content-center pr-2 pr-md-0">
                    <div class="message-mobile col-12 d-md-none">
                        <p v-if="theaterMode && activeLineMessage !== ''">{{ activeLineMessage }}</p>
                        <p v-else>Drücke auf "Play", um zu beginnen!</p>
                    </div>
                    <b-button :disabled="animationStep === 0" @click="prevStep" variant="secondary">&lt;</b-button>
                    <b-button :disabled="animationStep === animation.length-1" @click="togglePlay" :variant="animationInterval ? 'warning' : 'success'" class="mx-2">{{ animationInterval ? 'Pause' : 'Play' }}</b-button>
                    <b-button :disabled="animationStep === animation.length-1" @click="nextStep" variant="secondary" class="mr-2">&gt;</b-button>
                    <b-button :disabled="!theaterMode" @click="reset" variant="dark">Reset</b-button>
                </div>
            </div>
            <div class="anim col-md-4 order-1 order-md-2 mb-3">
                <h2>Burger:</h2>
                <slot name="anim"></slot>
                <!--<img src="../assets/img/burger.jpg" alt="" class="img-fluid">-->
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
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/for', '/foreach' ],
                playing: false,
                animationInterval: null,
                animationSpeed: 2000,
                animationStep: 0
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
            animationStep(newVal) {
                this.$emit('step', newVal);
            }
        },
        methods: {
            togglePlay() {
                if (!this.playing || !this.animationInterval) this.play();
                else this.pause();
            },
            play() {
                this.playing = true;
                this.animationInterval = setInterval(() => {
                    if (this.animationStep === this.animation.length - 1) {
                        this.pause();
                        return;
                    }
                    this.animationStep = this.animationStep + 1;
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
            },
            prevStep() {
                this.pause();
                this.animationStep = this.animationStep === 0 ? (this.animation.length - 2) : (this.animationStep - 1);
            },
            nextStep() {
                if (this.animationInterval) this.pause();
                if (!this.playing && this.animationStep === 0) {
                    this.playing = true;
                    return;
                }
                this.animationStep = (this.animationStep + 1) % this.animation.length;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .desc, .code, .anim {
        position: relative;
        transition: opacity .3s;
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
</style>