<template>
    <div id="home">
        <div class="container">
            <div id="content">
                <div class="intro">
                    <h1 class="display-3 display">Burger Loop</h1>
                    <p class="lead text-black-50">Lerne, wie man mit pr<code>0</code>grammen Burger zum Braten bringt und dabei komplizierte Probleme löst.</p>
                </div>

                <hr class="mb-5">
                <div class="row">

                    <div :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ? 'col-lg-4' : 'col-lg-3'" :style="{ opacity: theaterMode ? .3 : 1 }">
                        <h2 class="mb-3">Leg jetzt los:</h2>

                        <blockquote class="blockquote bg-light rounded py-2 px-3">
                            <p>"Ich habe mit Burger-Loop so schnell und einfach die Basics gelernt, ich kann es absolut jedem empfehlen!"</p>
                            <footer class="blockquote-footer">Jeder E-Commerce Student im 1. Semester</footer>
                        </blockquote>

                        <div class="pl-2">
                            <p>Schau es dir im Detail an!</p>
                            <b-button variant="outline-info" class="mb-5" to="/#intro" @click="intro">Starte die Tour!</b-button>
                        </div>
                    </div>

                    <div :class="hideBurgerOnIdle && !theaterMode ? 'col-lg-6' : !theaterMode ?  'col-lg-8' : 'col-lg-9'">
                        <Animation :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" @theaterMode="theaterMode = $event"></Animation>
                    </div>

                    <div class="nav-button next d-none d-sm-block">
                        <router-link :to="nextRoute">
                            <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#aaa" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <b-tooltip v-for="(introBubble, index) in introBubbles" trigger="click" :show="showIntro && introIndex === index" :disabled="!showIntro || introIndex !== index" :target="introBubble.el" :placement="introBubble.pos" :delay="{ show: 0, hide: 2000 }" :key="index">
            <span @click="introNext">{{ introBubble.text }}</span>
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
                introBubbles: [
                    { el: 'sourcecode-animation', pos: 'left', text: 'Hi! Klicke auf diese Sprechblase um fortzufahren.' },
                    { el: 'sourcecode-animation', pos: 'left', text: 'Hier haben wir den Programmiercode!' },
                    { el: 'burger-animation', pos: window.innerWidth < 768 ? 'bottom' : 'left', text: 'Anhand dieses Burgers zeigen wir dir was vorgeht!' },
                    { el: 'animation-play', pos: 'top', text: 'Hier kann die Animation gestartet und pausiert werden' },
                    { el: 'animation-prev', pos: 'top', text: 'Drücke hier, um einen Schritt zurück zu gehen.' },
                    { el: 'animation-far-prev', pos: 'top', text: 'Hier, um zur vorherigen Zeile im Code zu gelangen...' },
                    { el: 'animation-next', pos: 'top', text: 'Und hier einen Schritt weiter in der Animation.' },
                    { el: 'animation-frequency-slider', pos: 'top', text: 'Hier kannst du die Geschwindigkeit einstellen.' },
                    { el: 'animation-frequency-faster', pos: 'top', text: 'Bewege den Slider hierhin, um die Animation zu beschleunigen...' },
                    { el: 'animation-frequency-slower', pos: 'top', text: '...oder hierhin, um sie zu verlangsamen.' },
                    { el: 'animation-reset', pos: 'top', text: 'Hier kannst du die Animation jederzeit beenden.' },
                    { el: 'animation-play', pos: 'top', text: 'Ok, du bist bereit! Drücke Play um die Demo zu starten!' },
                ],
                introIndex: 0,
                showIntro: false
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
                    this.showIntro = false;
                    for (let bubble of this.introBubbles) {
                        document.getElementById(bubble.el).style.pointerEvents = '';
                    }
                }
            }
        },
        methods: {
            intro() {
                this.theaterMode = true;
                setTimeout(() => {
                    this.introIndex = 0;
                    this.showIntro = true;
                }, 300);
            },
            introNext() {
                if (this.introIndex < this.introBubbles.length - 2) {
                    this.introIndex++;
                    document.getElementById(this.introBubbles[this.introIndex].el).style.pointerEvents = 'none';
                } else if (this.introIndex < this.introBubbles.length - 1) {
                    this.introIndex++;
                    document.getElementById('animation-play').style.pointerEvents = '';
                } else {
                    this.showIntro = false;
                    this.theaterMode = false;

                    for (let bubble of this.introBubbles) {
                        document.getElementById(bubble.el).style.pointerEvents = '';
                    }
                }
            }
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
            left: -2rem;
        }
        &.next {
            right: -2rem;
        }
    }

    #home {
        #content {
            .intro {
                padding-top: .5rem;
            }
        }
    }

    @include media-breakpoint-down('lg') {
        .nav-button {
            &.prev { left: -1rem; }
            &.next { right: -1rem; }
        }
    }
    @include media-breakpoint-down('md') {
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
            height: 90px !important;
            font-weight: 400;
        }
    }
</style>