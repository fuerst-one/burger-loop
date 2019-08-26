<template>
    <div class="row mt-3 mt-lg-0">

        <div class="canvas col-md-8 order-3 order-md-0">
            <h2 @click="check">
                Spielfeld:
                <span class="status">
                    <svg v-if="correctCount === totalCount" height="17px" class="mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                    <span> {{ correctCount !== totalCount ? (correctCount + ' / ' + totalCount) : 'Geschafft' }}</span>
                </span>
            </h2>

            <div class="canvas-wrapper row" :class="{ dropping: activeBrick }">
                <div class="canvas-lines-wrapper container-fluid">
                    <div class="canvas-lines">

                        <h1 v-if="finished" class="end-screen">
                            <a href="javascript:" @click="toNextRoute" class="next">
                                <span>{{ nextRoute === '/' ? 'Fertig!' : nextRoute === '/if' ? 'Zur ersten Aufgabe!' : 'Zur nächsten Aufgabe' }}</span>
                            </a>
                        </h1>

                        <div class="canvas-line row mx-0">
                            <div class="drop-space show col-12" @click="dropToCanvas(-1, 0)" v-on:drop="dropToCanvas(-1, 0)" v-on:dragover="allowDrop">+</div>
                        </div>

                        <div v-for="(line, i) in solution" class="canvas-line row mx-0" :key="i">
                            <template v-for="(brick, j) in line">
                                <div class="drop-space col-auto" :class="activeBrick ? 'show' : ''" @click="dropToCanvas(i, j)" v-on:drop="dropToCanvas(i, j)" v-on:dragover="allowDrop" :key="i+'-'+j">+</div>
                                <div class="brick col-auto" :id="'brick' + brick.id" :class="activeBrick && brick.id === activeBrick.id ? 'active' : ''" draggable="true" @click="selectBrick(brick.id, 'solution')" v-on:dragstart="selectBrick(brick.id, 'solution')" :key="i+'--'+j">{{ brick.text }}</div>
                            </template>
                            <div v-if="line.length > 0" class="drop-space show col" :class="activeBrick ? 'show' : ''" @click="dropToCanvas(i, line.length)" v-on:drop="dropToCanvas(i, line.length)" v-on:dragover="allowDrop" :key="'a'+i">+</div>
                        </div>

                        <div v-if="solution.length > 0" class="canvas-line row mx-0">
                            <div class="drop-space show col-12" @click="dropToCanvas(solution.length, 0)" v-on:drop="dropToCanvas(solution.length, 0)" v-on:dragover="allowDrop">+</div>
                        </div>
                    </div>

                    <div v-if="solution.length > 0" class="progress">
                        <div class="progress-bar bg-primary" :style="progress"></div>
                        <div class="progress-bar bg-success" :style="correct"></div>
                    </div>

                    <span v-if="bricks.length === 0" @click="removeBadge" :class="remove ? 'text-danger' : ''">
                        {{ remove ? 'Aufgabe zurücksetzen' : 'Aufgabe zurücksetzen' }}
                    </span>
                    <span v-if="remove" @click="remove = false"> / Weiter</span>
                </div>
            </div>
        </div>
        <div class="pool col-md-4 order-3 order-md-0">
            <h2 class="d-none d-md-block">Puzzleteile:</h2>

            <div @click="dropToPool" v-on:drop="dropToPool" v-on:dragover="allowDrop" class="pool-wrapper container-fluid" :class="{ dropping: activeBrick }">
                <span :class="{ show: activeBrick && activeBrick.source !== 'bricks' }" class="trash-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"></path>
                    </svg>
                </span>

                <div class="pool-brick-wrapper row">
                    <div v-for="brick in bricks" :id="'brick' + brick.id" :class="activeBrick && brick.id === activeBrick.id ? 'active' : ''" class="brick col-auto" draggable="true" @click="selectBrick(brick.id, 'bricks')" v-on:dragstart="selectBrick(brick.id, 'bricks')" :key="brick.id">{{ brick.text }}</div>
                </div>
            </div>
            <a v-if="solution.length > 0" href="javascript:" @click="reset(false)" class="d-block text-muted text-center w-100 mt-2 mb-3">Zurücksetzen</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Quiz',
        components: {},
        directives: {},
        props: {
            template: Array
        },
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/array', '/for', '/map', '/foreach' ],
                bricks: [],
                solution: [],
                activeBrick: null,
                lastAction: '',
                dragging: false,
                finished: false,
                remove: false,
                exitIntent: false,
                correctCount: 0,
                setCount: 0,
                totalCount: 0
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
            progress() {
                return { width: (this.setCount / this.totalCount * 100) + '%' };
            },
            correct() {
                return { width: (this.correctCount / this.totalCount * 100) + '%' };
            }
        },
        watch: {},
        methods: {
            toNextRoute() {
                if (!this.exitIntent && this.solution.length > 0 && !this.finished) {
                    this.exitIntent = true;
                } else if (this.exitIntent) {
                    this.$router.push(this.nextRoute);
                }
            },
            selectBrick(id, source) {
                this.activeBrick = this.activeBrick ? null : { id, source };
                event.stopPropagation();
            },
            dropToCanvas(line, index) {
                if (this.activeBrick === null) return;

                let brick;

                if (this.activeBrick.source === 'bricks') {
                    brick = this.bricks.splice(this.bricks.findIndex(b => b.id === this.activeBrick.id), 1)[0];
                } else if (this.activeBrick.source === 'solution') {
                    for (let i = 0; i < this.solution.length; i++) {
                        if (this.solution[i].find(b => b.id === this.activeBrick.id)) {
                            let j = this.solution[i].findIndex(b => b.id === this.activeBrick.id);

                            if (line === i && index > j) index--;

                            brick = this.solution[i].splice(j, 1)[0];

                            if (this.solution[i].length === 0) {
                                this.solution.splice(i, 1);
                                if (line > i) line--;
                            }
                        }
                    }
                }

                if (line === -1) {
                    this.solution.splice(0, 0, []);
                    line++;
                } else if (!this.solution[line]) {
                    this.solution[line] = [];
                }

                this.$set(this.solution[line], this.solution[line].splice(index, 0 , brick));
                this.activeBrick = null;
                this.dragging = false;
                event.preventDefault();

                this.check();

                if (this.solution.length !== this.template.length) return;

                for (let i = 0; i < this.template.length; i++) {
                    if (this.solution[i].length !== this.template[i].length) return;

                    for (let j = 0; j < this.template[i].length; j++) {
                        if (this.solution[i][j].text !== this.template[i][j]) return;
                        else this.solution[i][j].correct = true;
                    }
                }

                if (!window['badges'] || !window['badges'].find(badge => badge === this.$route.name)) this.$emit('addBadge');

                this.finished = true;
            },
            dropToPool() {
                event.preventDefault();
                if (this.activeBrick === null) return;

                if (this.activeBrick.source !== 'bricks') {
                    for (let i = 0; i < this.solution.length; i++) {
                        if (this.solution[i].find(b => b.id === this.activeBrick.id)) {
                            this.bricks.push(this.solution[i].splice(this.solution[i].findIndex(b => b.id === this.activeBrick.id), 1)[0]);

                            if (this.solution[i].length === 0) {
                                this.solution.splice(i, 1);
                            }
                        }
                    }
                }
                this.activeBrick = null;
                this.dragging = false;
            },
            allowDrop(event) {
                event.preventDefault();
            },
            check() {
                let solutionList = this.solution.reduce((arr, con) => arr.concat(con), []);
                let templateList = this.template.reduce((arr, con) => arr.concat(con), []).map((item, index) => {
                    return {
                        id: index,
                        text: item,
                        correct: false
                    }
                });

                if (this.solution.length === 0) {
                    this.message = "0 / " + templateList.length;
                    return 0;
                }

                /*for (let i = 0, j = 0; i < solutionList.length; i++) {
                    if (i === solutionList.length - 1 && solutionList[i].id === solutionList.length - 1) {
                        templateList.find(item => item.id === solutionList[i].id).correct = true;

                    } else if (i < solutionList.length - 1 && solutionList[i].id < solutionList[i+1].id) {
                        templateList.find(item => item.id === solutionList[i].id).correct = true;
                    }
                }*/

                let startIndex = 0;
                let templateIndex = 0;

                while (startIndex < solutionList.length) {
                    templateIndex = templateList.findIndex(b => b.text === solutionList[startIndex].text);

                    if (templateIndex < 0) break;

                    for (let i = startIndex; i < Math.min(solutionList.length, templateList.length) - startIndex; i++) {
                        if (solutionList[startIndex+i] && solutionList[startIndex+i].text === templateList[templateIndex+i].text) {
                            templateList[templateIndex+i].correct = true;
                        } else {
                            startIndex += i - 1;
                            break;
                        }
                    }

                    startIndex++;
                }

                this.correctCount = templateList.filter(i => i.correct).length;
                this.setCount = solutionList.length;
                this.totalCount = templateList.length;
            },
            reset(finished) {
                let index = 0;

                let bricks = this.template.map(line => line.map(function (brick) { return { id: index++, text: brick } }));

                if (finished) {
                    this.bricks = [];
                    this.solution = bricks;
                } else {
                    this.bricks = bricks.reduce((arr, con) => arr.concat(con), []).shuffle();
                    this.solution = [];
                }
                this.activeBrick = null;
                this.check();
            },
            removeBadge() {
                if (this.remove) {
                    this.$emit('removeBadge');
                    this.reset(false);
                    this.remove = false;
                }
                else this.remove = true;
            }
        },
        mounted() {
            setTimeout(() => {
                this.finished = window['badges'] && window['badges'].find(badge => badge === this.$route.name);
                this.reset(this.finished);
            }, 100);

        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .canvas-lines {
        position: relative;
        overflow-y: auto;
        height: 22.5rem;
        max-height: 22.5rem;
        margin: 0 -.75rem 1rem;
        background: $dark;
        color: $white;
        border-radius: $border-radius;

        .end-screen {
            position: absolute;
            top: 0;
            left: 1.5rem;
            right: calc(1rem - 1px);
            bottom: 1rem;
            border-radius: $border-radius;
            overflow: hidden;

            opacity: 0;
            pointer-events: none;
            transition: opacity .3s;
        }

        scrollbar-color: $gray-800 $dark;
        scrollbar-width: thin;
        &::-webkit-scrollbar {
            width: 10px;
        }
        background: $dark;
        &::-webkit-scrollbar-track {
            background: $dark;
            border-radius: 0 5px 5px 0;
        }
        &::-webkit-scrollbar-thumb {
            width: 8px;
            margin: 0 auto;
            background: $gray-800;
            border-radius: 0 5px 5px 0;
            &:hover {
                background: $gray-700;
            }
        }

        .canvas-line {
            /*min-height: 2.5rem;*/
            margin: 0 0 .25rem 0;
            overflow-x: scroll;
            flex-wrap: nowrap;

            &:hover .drop-space {
                max-width: 100%;
                width: 1rem;
                visibility: visible;
            }

            .drop-space {
                margin: 0;
                padding: .25rem .1rem;
                width: 0;
                visibility: hidden;
                height: 2rem;
                background: $black;
                color: $gray-600;
                border-radius: $border-radius;

                &.show {
                    max-width: 100%;
                    visibility: visible;

                    &:not(:last-of-type) { width: 1rem; }
                    &:last-of-type { width: auto; }

                    &:hover {
                        background: $gray-700;
                    }
                }
            }
            .brick {
                margin: 0;
            }
        }
    }

    .canvas-wrapper.dropping .drop-space, .pool-wrapper.dropping {
        cursor: copy;
    }
    .canvas-wrapper.dropping .drop-space {
        background: $gray-800;
    }

    .pool-wrapper {
        position: relative;

        .trash-screen {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: $border-radius;
            opacity: 0;
            z-index: 2;
            background: rgba($white, .66);
            text-align: center;
            transition: opacity .3s;
            pointer-events: none;

            &.show {
                pointer-events: all;
                opacity: 1;
            }

            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                fill: $primary;
                height: 4rem;
            }
        }

        .pool-brick-wrapper {
            height: 22.5rem;
            max-height: 22.5rem;
            padding: .25rem;
            background: $gray-200;
            overflow-y: scroll;
            border-radius: $border-radius;
            align-content: start;

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

    .progress {
        position: relative;

        .bg-success {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 0;
        }
    }

    .brick {
        display: inline-block;
        height: 2rem;
        padding: .25rem;
        margin: .25rem;
        background: $gray-600;
        color: $white;
        border-radius: $border-radius;
        box-shadow: 0 1px 3px 0 rgba($dark, .3);

        &:hover, .canvas-wrapper & {
            background: $info;
        }

        &.active, .canvas-wrapper &:hover {
            background: darken($info, 20);
        }
    }

    .status {
        font-size: 80%;
        font-weight: lighter;
        color: $gray-700;

        svg {
            fill: $success;
        }
    }
    .remove-message {
        font-size: 50%;
        color: $gray-700;
    }

    .drop-space {
        display: inline-block;
        height: 1.5rem;
        width: 1.5rem;
        color: $white;
        background: $info;
        border-radius: 100%;
        font-weight: bold;
        text-align: center;
        transition: width .1s;
    }

    @include media-breakpoint-down('sm') {
        .canvas-lines, .pool-brick-wrapper {
            height: auto !important;
        }
        .pool {
            margin: 1rem 0;
        }
        .dropping .canvas-lines {
            min-height: auto !important;

            .canvas-line:hover .drop-space {
                width: auto;

                &:not(:last-of-type) {
                    width: auto !important;
                    padding-left: .5rem;
                    padding-right: .5rem;
                }
            }
        }
        .brick {
            padding: .25rem .5rem;
        }
    }
</style>