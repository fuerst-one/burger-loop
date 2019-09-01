<template>
    <div v-if="visible" class="description-overlay-background" @click="$emit('close')">
        <div class="description-overlay-wrapper">
            <div class="description-overlay">
                <div @click="$emit('close')" class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
                </div>
                <div class="overlay-container container">
                    <div class="description-wrapper" @click="stop">
                        <div class="description">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DescriptionOverlay',
        components: {},
        directives: {},
        props: {
            description: String,
            visible: Boolean
        },
        data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {
            stop($event) {
                $event.stopPropagation();

            }
        }
    }
</script>


<style lang="scss" scoped>
    @import '../assets/variables';

    .description-overlay-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($gray-500, .5);
        z-index: 20;

        animation: .3s fadeIn 1;
    }

    .description-overlay-wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 90%;
        max-width: 700px;
        height: 60%;
        max-height: 700px;

        .description-overlay {
            background: $light;
            box-shadow: 0 .6rem 3rem rgba($black, .3);
            border-radius: 2rem 1.5rem 2rem 2rem;
            padding: 2.5rem;
            height: 100%;
            width: 100%;

            /*animation: 1s rubberBand 1;*/

            .overlay-container {
                position: relative;
                max-height: calc(100% + 1.5rem);
                overflow-y: auto;

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
        }

        .close {
            position: absolute;
            top: .5rem;
            right: .5rem;
            background: $gray-300;
            border-radius: 100%;
            width: 2rem;
            height: 2rem;
            text-align: center;
            padding: .1rem;
            cursor: pointer;

            svg {
                height: 1.5rem;
                width: 1.5rem;
            }
        }
    }

    @include media-breakpoint-down('md') {
        .description-overlay-wrapper {
            top: 47.5%;
            height: 90%;
            max-height: unset;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes rubberBand {
        from {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }

        20% {
            -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
        }

        30% {
            -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
        }

        50% {
            -webkit-transform: scale3d(1.03, 0.97, 1);
            transform: scale3d(1.03, 0.97, 1);
        }

        65% {
            -webkit-transform: scale3d(0.99, 1.01, 1);
            transform: scale3d(0.99, 1.01, 1);
        }
    }
</style>