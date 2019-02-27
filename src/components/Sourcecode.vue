<template>
    <div id="sourcecode-animation" class="sourcecode-animation">
        <pre v-highlightjs="sourcecode"><code class="php" :style="{ height: theaterMode ? '' : '18rem' }"></code></pre>

        <div id="line-indicator" class="line-indicator" :style="{ top: indicatorPosition, opacity: theaterMode ? 1 : .3 }">
            <div v-if="activeLineStatus === 0" class="dot"></div>
            <div v-if="activeLineStatus === 1" class="question">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path>
                </svg>
            </div>
            <div v-if="activeLineStatus === 2" class="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
            </div>
            <div v-if="activeLineStatus === 3" class="false">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
            </div>
        </div>

        <div v-show="theaterMode" class="line-outline" :style="{ top: indicatorPosition }"></div>
    </div>
</template>

<script>
    export default {
        name: 'Sourcecode',
        props: {
            sourcecode: String,
            sourcecodeAnimationTask: Array,
            theaterMode: Boolean
        },
        computed: {
            desktopViewport() {
                return window.innerWidth > 991;
            },
            activeLine() {
                return this.sourcecodeAnimationTask[0];
            },
            indicatorPosition() {
                return 0.5 + this.activeLine * 1.06 + 'rem';
            },
            activeLineStatus() {
                return this.sourcecodeAnimationTask[1];
            },
            activeLineMessage() {
                return this.sourcecodeAnimationTask[3];
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    $size: 1.3rem;

    .sourcecode-animation {
        position: relative;

        pre {
            border-radius: $border-radius;
            background: $dark;

            /* Optional Design: Padded Line Indicator */
            /*border-radius: 0 $border-radius $border-radius 0;
            &::before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: -1.4rem;
                right: calc(100% - #{$border-radius});
                bottom: 0;
                background: $gray-200;
                border-radius: $border-radius 0 0 $border-radius;
                z-index: -1;
            }*/

            code {
                transition: height .3s;
                min-height: 22.5rem;
                z-index: 1;
                overflow-y: hidden;

                scrollbar-color: $gray-700 $dark;
                scrollbar-width: thin;
                &::-webkit-scrollbar {
                    height: 10px;
                }
                &::-webkit-scrollbar-track {
                    background: $dark;
                    border-radius: 0 0 $border-radius $border-radius;
                }
                &::-webkit-scrollbar-thumb {
                    height: 10px;
                    margin: 0 auto;
                    background: $gray-700;
                    border-radius: 0 0 $border-radius $border-radius;
                    &:hover {
                        background: $gray-600;
                    }
                }
            }
        }

        .line-indicator {
            position: absolute;
            top: .5rem;
            left: -$size;
            width: $size;
            height: $size;
            margin-top: -($size - 1)/2;
            pointer-events: none;

            .dot, .true, .false {
                display: block;
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
                path { fill: $danger }
            }
            .true {
                path { fill: $success }
            }
            .question {
                path { fill: $blue }
            }
            .dot {
                height: 14px;
                width: 14px;
                margin: 16.6%;
                border-radius: 100%;
                background: $primary;

                /* Optional Design: burger Line Indicator */
                /*background: url("../assets/img/burger/burger.png") transparent no-repeat;
                background-size: contain;
                border-radius: 0;
                margin: 16.6% 0 0*/
            }
        }

        .line-outline {
            position: absolute;
            top: .5rem;
            left: 0;
            right: 0;
            height: $size;
            margin-top: -($size - 1)/2;
            background: rgba($black,.3);
        }
    }

    @include media-breakpoint-down('lg') {
        code {
            height: auto !important;
        }
    }
</style>