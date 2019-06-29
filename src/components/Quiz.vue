<template>
    <div class="row mt-3 mt-lg-0">

        <div class="canvas col-md-8 order-3 order-md-0">
            <h2 class="d-none d-md-block">Spielfeld: {{ message }}</h2>

            <div class="canvas-wrapper row" :class="{ dropping: activeBrick }">
                <div class="canvas-lines-wrapper container-fluid">
                    <div class="canvas-lines">

                        <div class="canvas-line row mx-0">
                            <div class="drop-space show col-12" @click="dropToSolution(-1, 0)" v-on:drop="dropToSolution(-1, 0)" v-on:dragover="allowDrop">+</div>
                        </div>

                        <div v-for="(line, i) in solution" class="canvas-line row mx-0" :key="i">
                            <template v-for="(brick, j) in line">
                                <div class="drop-space col-auto" :class="activeBrick ? 'show' : ''" @click="dropToSolution(i, j)" v-on:drop="dropToSolution(i, j)" v-on:dragover="allowDrop">+</div>
                                <div class="brick col-auto" :id="'brick' + brick.id" :class="activeBrick && brick.id === activeBrick.id ? 'active' : ''" draggable="true" @click="selectBrick(brick.id, 'solution')" v-on:dragstart="selectBrick(brick.id, 'solution')" :key="j">{{ brick.text }}</div>
                            </template>
                            <div v-if="line.length > 0" class="drop-space col-auto" :class="activeBrick ? 'show' : ''" @click="dropToSolution(i, line.length)" v-on:drop="dropToSolution(i, line.length)" v-on:dragover="allowDrop">+</div>
                        </div>

                        <div v-if="solution.length > 0" class="canvas-line row mx-0">
                            <div class="drop-space show col-12" @click="dropToSolution(solution.length, 0)" v-on:drop="dropToSolution(solution.length, 0)" v-on:dragover="allowDrop">+</div>
                        </div>
                    </div>

                    <div class="progress">
                        <div class="progress-bar bg-primary" :style="{ width: 100 - (bricks.length / totalBricks * 100) + '%' }"></div>
                    </div>
                    <a v-if="solution.length > 0" href="javascript:" @click="reset" class="d-block text-center w-100">Zurücksetzen</a>
                </div>
            </div>
        </div>
        <div class="pool col-md-4 order-3 order-md-0">
            <h2 class="d-none d-md-block">Bausteine:</h2>

            <div class="pool-wrapper container-fluid" :class="{ dropping: activeBrick }">
                <div @click="dropToBricks" v-on:drop="dropToBricks" v-on:dragover="allowDrop" class="pool-brick-wrapper row">
                    <div v-for="brick in bricks" :id="'brick' + brick.id" :class="activeBrick && brick.id === activeBrick.id ? 'active' : ''" class="brick col-auto" draggable="true" @click="selectBrick(brick.id, 'bricks')" v-on:dragstart="selectBrick(brick.id, 'bricks')" :key="brick.id">{{ brick.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Quiz',
        components: {},
        directives: {},
        props: {
            exercise: Array
        },
        data() {
            return {
                totalBricks: 0,
                bricks: [],
                solution: [],
                activeBrick: null,
                lastAction: '',
                dragging: false,
                message: '',
            }
        },
        computed: {},
        watch: {},
        methods: {
            selectBrick(id, source) {
                this.activeBrick = { id, source };
                event.stopPropagation();
            },
            dropToSolution(line, index) {
                if (this.activeBrick === null) return;

                let brick;

                if (this.activeBrick.source === 'bricks') {
                    brick = this.bricks.splice(this.bricks.findIndex(b => b.id === this.activeBrick.id), 1)[0];
                } else {
                    for (let i = 0; i < this.solution.length; i++) {
                        if (this.solution[i].find(b => b.id === this.activeBrick.id)) {
                            brick = this.solution[i].splice(this.solution[i].findIndex(b => b.id === this.activeBrick.id), 1)[0];

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

                if (this.solution.length !== this.exercise.length) return;

                for (let i = 0; i < this.exercise.length; i++) {
                    if (this.solution[i].length !== this.exercise[i].length) return;

                    for (let j = 0; j < this.exercise[i].length; j++) {
                        if (this.solution[i][j].text !== this.exercise[i][j]) return;
                        else this.solution[i][j].correct = true;
                    }
                }

                this.message = 'Correct';
            },
            dropToBricks() {
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
            reset() {
                this.bricks = this.exercise.reduce((line, arr) => arr.concat(line), []).shuffle().map(function (brick, index) { return { id: index, text: brick } });
                this.solution = [];
                this.activeBrick = null;
            }
        },
        mounted() {
            this.bricks = this.exercise.reduce((line, arr) => arr.concat(line), []).shuffle().map(function (brick, index) { return { id: index, text: brick } });
            this.totalBricks = this.bricks.length;
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .canvas-lines {
        position: relative;
        overflow: visible;
        min-height: 22.5rem;
        margin: 0 -.75rem 1rem;
        background: $dark;
        color: $white;
        border-radius: $border-radius;

        .canvas-line {
            min-height: 2.5rem;
            margin: .25rem 0;
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
                    width: 1rem;
                    visibility: visible;
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

    .pool-wrapper {
        min-height: 22.5rem;

        .pool-brick-wrapper {
            min-height: inherit;
            align-content: start;
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

        &:hover {
            background: $info;
        }

        &.active {
            background: darken($info, 20);
        }
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
</style>