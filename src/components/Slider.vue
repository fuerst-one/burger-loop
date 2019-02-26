<template>
    <div class="animation-speed-slider-wrapper">
        <div @click="$emit('change', value > 0 ? value - 1 : value)" id="animation-frequency-slower" class="slower-icon">
            <svg height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ddd" d="M68.25 256h279.51c23.54 0 40.97-19.8 35.1-40.04C362.84 146.97 292.33 64 208.41 64h-.82c-83.91 0-154.43 82.97-174.44 151.96C27.27 236.2 44.71 256 68.25 256zm484.03-118.75l-48.65-34.75c-35.17-17.42-80.49 1.57-86.81 40.31-.54 3.32-.82 6.72-.82 10.19v71.22c-.03 13.88-4.6 27.18-13.27 38.44-12.42 16.11-31.25 25.34-51.68 25.34H18.6C8.33 288 0 296.33 0 306.6c0 8 5.12 15.11 12.71 17.64l98.29 22.1L66.17 424c-6.16 10.67 1.54 24 13.86 24h36.95c5.71 0 11-3.05 13.86-8l40.3-69.8c25.99 8.52 45.55 13.8 84.87 13.8s58.89-5.28 84.87-13.8l40.3 69.8c2.86 4.95 8.14 8 13.86 8h36.95c12.32 0 20.01-13.33 13.86-24l-47.21-81.76c21.25-8.42 40.36-21.78 54.81-40.53 14.08-18.28 22.47-39.4 25.29-61.7h40.62c31.29 0 56.65-25.36 56.65-56.65a56.7 56.7 0 0 0-23.73-46.11zM480 176c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"></path></svg>
        </div>
        <input @change="$emit('change', $event.target.value)" :value="value" class="animation-speed-slider form-control-range" type="range" min="0" max="2" step="1">
        <div class="ticks">
            <span @click="$emit('change', 0)">x1</span>
            <span @click="$emit('change', 1)">x2</span>
            <span @click="$emit('change', 2)">x4</span>
        </div>

        <div @click="$emit('change', value < 2 ? value + 1 : value)" id="animation-frequency-faster" class="faster-icon">
            <svg height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ddd" d="M135.52 412.67a15.99 15.99 0 0 0-7.52 13.57v37.74c0 12.57 13.82 20.23 24.48 13.57l66.69-39.87-47.85-47.85-35.8 22.84zm416.76-195.42l-56.42-34.62c-.06-13.95-2.28-30.77-7.07-48.67-11.32-42.24-31.91-73.43-45.99-69.66-14.08 3.77-16.32 41.08-5 83.32.65 2.44 1.44 4.7 2.15 7.06-4.89-6.08-10.23-12.23-16.31-18.32-30.93-30.92-64.35-47.64-74.66-37.33s6.4 43.73 37.33 74.66c12.67 12.67 25.67 22.77 37.42 29.78-3.14 5.76-5.71 12.06-6.89 19.32-.49 3.03-.71 6.15-.75 9.31C364.55 195.11 261.59 128 192 128c-52.08 0-85.21 28.24-104.72 54.09-1.77-2.7-2.96-5.66-5.33-8.03-18.75-18.75-49.14-18.75-67.88 0-18.74 18.74-18.74 49.14 0 67.88 16.4 16.39 41.29 17.57 59.92 5.29l191.4 191.4c6 6 14.14 9.37 22.63 9.37h144c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-96v-55.59c0-35.53-23.86-67.16-58.02-76.91l-42.38-12.11c-8.5-2.44-13.42-11.3-11-19.78 2.44-8.52 11.41-13.33 19.78-11l42.38 12.11C318.59 234.38 352 278.66 352 328.41V352l64-32h103.35c31.29 0 56.65-25.36 56.65-56.65a56.66 56.66 0 0 0-23.72-46.1zM496 256c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"></path></svg>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'Slider',
        props: {
            value: {
                default: 0
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/input-range.scss';

    .animation-speed-slider-wrapper {
        position: relative;

        .animation-speed-slider {
            -webkit-appearance: none;
            width: 100%;
            background: transparent;
        }

        .faster-icon, .slower-icon {
            position: absolute;
            top: -.75rem;
        }
        .slower-icon {
            left: -2.5rem;
        }
        .faster-icon {
            right: -2.5rem;
        }
        .ticks {
            position: relative;
            top: 1rem;
        span {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            color: #888;
            font-weight: 700;

            &:first-of-type {
                 left: .4rem;
             }
            &:last-of-type {
                 left: calc(100% - .4rem);
             }
            }
        }
    }
</style>