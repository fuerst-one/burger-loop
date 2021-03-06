<template>
    <div id="home" class="content-wrapper">
        <div class="container">
            <div id="content">
                <div class="intro">
                    <h1 class="display">Burger Loop</h1>
                    <p class="lead text-black-50">Lerne, wie man mit pr<code>0</code>grammen Burger zum Braten bringt und sich dabei das Leben leichter macht.</p>
                </div>

                <hr class="mb-5">
                <div class="row">

                    <div :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ? 'col-lg-4' : 'col-lg-3'" :style="{ opacity: theaterMode ? .3 : 1 }">
                        <h2>Leg' jetzt los:</h2>

                        <blockquote class="blockquote bg-light rounded py-2 px-3">
                            <p>&raquo; Ich habe mit Burger Loop so schnell und einfach die Basics gelernt, ich kann es absolut jedem empfehlen! &laquo;</p>
                            <footer class="blockquote-footer">Nahezu jeder E-Commerce Student im 1. Semester</footer>
                        </blockquote>

                        <div class="pl-2">
                            <p>Schau' dir im Detail an wie Burger Loop funktioniert:</p>
                            <b-button id="start-tutorial" variant="outline-info" class="btn-cta mb-5" @click="toggleTutorial">{{ showTutorial ? 'Beende die Tour.' : 'Starte die Tour' }}</b-button>
                        </div>
                    </div>

                    <div v-show="introNeeded !== null" class="animation" :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ?  'col-lg-8' : 'col-lg-9'">
                        <Animation :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" @theaterMode="theaterMode = $event" :people="people" :force-animation-step="forceAnimationStep"></Animation>
                        <img v-if="!introNeeded" :class="{ show: !introDone }" @click="toggleTutorial" src="../assets/img/curtain.svg" alt="Intro Curtain" class="intro-curtain">
                    </div>
                </div>

                <div class="nav-button next d-none d-sm-block">
                    <router-link :to="nextRoute">
                        <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#aaa" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                    </router-link>
                </div>
            </div>
        </div>

        <b-tooltip
                v-for="(tutorialBubble, index) in tutorial"
                trigger="click"
                :show="showTutorial && tutorialIndex === index"
                :disabled="!showTutorial || tutorialIndex !== index"
                :target="tutorialBubble.el" :placement="tutorialBubble.pos"
                :delay="{ show: 300, hide: 100000 }"
                :key="index"
        >
            <span @click="tutorialNext">{{ tutorialBubble.text }}</span>
        </b-tooltip>

    </div>
</template>

<script>
    import BTooltip from "bootstrap-vue/src/components/tooltip/tooltip";
    import BButton from "bootstrap-vue/src/components/button/button";
    import Animation from "../components/Animation";
    export default {
        name: 'home',
        components: {BTooltip, BButton, Animation},
        data() {
            return {
                routes: ['/if', '/while', '/do-while', '/for', '/foreach'],
                theaterMode: false,
                sourcecode: [
                    '// Hey. Das ist Burger Loop.',
                    '// Hier lernst du die Basics, ',
                    '// die du zum Programmieren brauchst.',
                    '// Probier\' es direkt aus!',
                    '// Drücke auf Play!',
                    '',
                    'if ($ready) {',
                    '   go();',
                    '}',
                ],
                animation: [
                    // sourcecode line, line-indicator status, burger animation frame, line-indicator tooltip
                    [ 0, 0, 0, ''],
                    [ 0, 0, 9, 'Hallo!'],
                    [ 1, 0, 0, 'Das ist unser Code-Helper!'],
                    [ 2, 0, 1, 'So werden wir auf den nächsten Seiten kommunizieren!'],
                    [ 3, 0, 2, 'Wir zeigen dir direkt am Code was passiert...'],
                    [ 4, 0, 3, '...und worauf du achten musst!'],
                    [ 6, 1, 4, 'Also, falls du bereit bist:'],
                    [ 6, 1, 5, 'Such dir ein Kapitel in der Navigation aus...'],
                    [ 6, 1, 6, 'Oder drücke den Pfeil rechts...'],
                    [ 6, 2, 7, 'Und lerne die Programmier-Basics!'],
                    [ 7, 0, 8, 'Wir freuen uns darauf dir etwas beizubringen!'],
                    [ 7, 2, 9, 'Let\'s go!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun' ],
                    [ 'bottomBun', 'patty' ],
                    [ 'bottomBun', 'patty', 'salad' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3', 'sauce' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3', 'sauce', 'topBun' ],
                ],
                people: [],
                tutorial: [
                    { el: 'start-tutorial', pos: 'top', text: 'Hi! Klicke auf diese Sprechblase um fortzufahren.' },
                    { el: 'sourcecode-animation', pos: 'left', text: 'Hier haben wir den Programmiercode!' },
                    { el: 'line-indicator', pos: window.innerWidth < 768 ? 'right' : 'left', text: 'Hier siehst du die aktuelle Zeile.' },
                    { el: 'burger-animation', pos: window.innerWidth < 768 ? 'bottom' : 'left', text: '' },
                    { el: 'burger-animation', pos: window.innerWidth < 768 ? 'bottom' : 'left', text: 'Das ist unser Code-Burger, der dir zeigt was vorgeht!' },
                    { el: 'chef', pos: window.innerWidth < 768 ? 'bottom' : 'left', text: 'Das ist unser Koch, er brät unsere deliziösen Code-Burger,' },
                    { el: 'barkeeper', pos: window.innerWidth < 768 ? 'bottom' : 'left', text: 'Unser Barkeeper bereitet Drinks zu  und bedient Gäste,' },
                    { el: 'guest', pos: window.innerWidth < 768 ? 'bottom' : 'left', text: 'So wie diese nette Dame! Das ist unser Burger Loop Dreamteam.' },
                    { el: 'animation-play', pos: 'top', text: 'Wir führen dich anhand einer Animation durch den Code. Hier kann sie gestartet und pausiert werden' },
                    { el: 'animation-next', pos: 'top', text: 'Hier gelangst du schrittweise voran.' },
                    { el: 'animation-prev', pos: 'top', text: 'Drücke hier, um einen Schritt zurück zu gehen.' },
                    { el: 'animation-far-prev', pos: 'top', text: 'Hier, um zur vorherigen Zeile im Code zu springen...' },
                    { el: 'animation-frequency-slider', pos: 'top', text: 'Hier kannst du die Geschwindigkeit einstellen.' },
                    { el: 'animation-frequency-faster', pos: 'top', text: 'Bewege den Slider hierhin, um die Animation zu beschleunigen...' },
                    { el: 'animation-frequency-slower', pos: 'top', text: '...oder hierhin, um sie zu verlangsamen.' },
                    { el: 'animation-reset', pos: 'top', text: 'Hier kannst du die Animation jederzeit beenden.' },
                    { el: 'animation-play', pos: 'top', text: 'Okay, du bist bereit! Drücke Play um die Demo zu starten!' },
                ],
                tutorialIndex: 0,
                showTutorial: false,
                introNeeded: null,
                introDone: false,
                forceAnimationStep: -1,
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
            hideBurgerOnIdle() {
                return window.hideBurgerOnIdle;
            }
        },
        watch: {
            theaterMode(newVal) {
                if (newVal) {
                    this.showTutorial = false;
                    for (let bubble of this.tutorial) {
                        document.getElementById(bubble.el).style.pointerEvents = '';
                    }
                }
            }
        },
        methods: {
            toggleTutorial() {
                if (this.showTutorial) {
                    this.showTutorial = false;
                    this.theaterMode = false;

                    for (let bubble of this.tutorial) {
                        document.getElementById(bubble.el).style.pointerEvents = '';
                    }
                    return;
                }

                this.theaterMode = true;
                this.people = [];
                this.forceAnimationStep = 0;

                setTimeout(() => {
                    this.tutorialIndex = 0;
                    this.showTutorial = true;
                    this.introDone = true;
                    this.$cookie.set("introDone", true, 180);
                }, 300);

                setTimeout(() => {
                    this.introNeeded = false;
                }, 1000);
            },
            tutorialNext() {

                if (this.tutorialIndex < this.tutorial.length - 3) {
                    let peopleVisible = false;
                    if (this.tutorial[this.tutorialIndex+1].el === "burger-animation" && this.tutorial[this.tutorialIndex].el !== "burger-animation") {
                        this.forceAnimationStep = 11;
                        setTimeout(() => {
                            this.tutorialNext();
                        }, 800);

                    } else if (this.tutorial[this.tutorialIndex+1].el === "chef") {
                        this.people = ["chef"];

                    } else if (this.tutorial[this.tutorialIndex+1].el === "barkeeper") {
                        this.people = ["chef", "barkeeper"];

                    } else if (this.tutorial[this.tutorialIndex+1].el === "guest") {
                        this.people = ["chef", "barkeeper", "guest"];
                        peopleVisible = true;
                    }
                    if (peopleVisible) {
                        this.people = [ "barkeeper", "chef", "guest" ];
                    }
                }

                if (this.tutorialIndex === 1) {
                    this.tutorialIndex++;

                } else if (this.tutorialIndex < this.tutorial.length - 2) {
                    this.tutorialIndex++;
                    document.getElementById(this.tutorial[this.tutorialIndex].el).style.pointerEvents = 'none';

                } else if (this.tutorialIndex < this.tutorial.length - 1) {
                    this.tutorialIndex++;
                    document.getElementById('animation-play').style.pointerEvents = '';

                } else {
                    this.showTutorial = false;
                    this.forceAnimationStep = -1;

                    for (let bubble of this.tutorial) {
                        document.getElementById(bubble.el).style.pointerEvents = '';
                    }
                }
            }
        },
        mounted() {
            if (window.innerWidth < 992) {
                this.tutorial.splice(3, 0, { el: 'animation-tooltip', pos: window.innerWidth < 768 ? 'bottom' : 'top', text: 'Hier wird jeder Code-Schritt einzeln erklärt!' });
            }

            setTimeout(() => {
                this.introDone = this.introNeeded = this.$cookie.get("introDone") ? this.$cookie.get("introDone") : false;
                if (this.introDone) this.people = [ "barkeeper", "chef", "guest" ];
            }, 300);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .row {
        position: relative;

        & > [class*='col-'] {
            transition: opacity .3s, flex .3s, max-width .3s;
        }
    }

    .animation {
        position: relative;
        transition: opacity .3s, flex .3s, max-width .3s;
        min-height: 25rem;

        .intro-curtain {
            position: absolute;
            top: -3.5rem;
            left: 120%;
            width: calc(100% + 2.5rem);
            transition: left .5s;
            z-index: 21;

            &.show {
                left: -2.2rem;
            }
        }
    }

    .btn-cta {
        box-shadow: 0 0 .5rem -.25rem $primary, inset 0 0 1rem -.5rem rgba($primary, .1);
    }

    .tooltip span {
        display: block;
        cursor: pointer;
    }

    .nav-button {
        position: absolute;
        top: .1rem;
        width: 1rem;
        height: 1rem;

        &.prev {
            left: 5rem;
        }
        &.next {
            right: 5rem;
        }
    }

    .nav-button {
        position: fixed;
        top: calc(50%);
        transition: opacity .3s;

        [class*="slide-"] & {
            opacity: 0;
            transition: none;
        }
    }

    #home {
        #content {
            .intro {
                padding-top: .5rem;

                .display {
                    font-size: 3rem;
                    font-weight: 600;
                }
            }
        }
    }

    @include media-breakpoint-up('lg') {
        .animation .intro-curtain {
            left: 75vw;
        }
    }
    @include media-breakpoint-down('lg') {
        .nav-button {
            position: fixed;
            top: calc(50% - 3.5rem);
            &.prev { left: 1rem; }
            &.next { right: 1rem; }
            transition: opacity .3s;

            [class*="slide-"] & {
                opacity: 0;
                transition: opacity .05s;
            }
        }
    }
    @include media-breakpoint-down('md') {
        .animation {
            padding: 0 1.7rem;
        }
        .display {
            font-size: 4.4rem;
        }
        .lead {
            height: 60px;
            margin-bottom: calc(3rem - 2px);
        }
    }
    @include media-breakpoint-down('sm') {
        #home {
            #content {
                .intro {
                    padding-top: .1rem;
                    height: auto;
                }
            }
        }
    }
    @include media-breakpoint-down('xs') {
        .display {
            font-size: 3rem;
            font-weight: 600;
        }
        .lead {
            height: auto;
            font-weight: 400;
        }
    }
</style>