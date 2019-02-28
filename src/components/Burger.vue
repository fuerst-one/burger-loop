<template>
    <div @click="jump" id="burger-animation" class="burger-animation no-select">
        <div id="topBun" class="layer"><img src="../assets/img/burger2/topBun.svg" alt=""></div>
        <div id="sauce" class="layer"><img src="../assets/img/burger2/sauce.svg" alt=""></div>
        <div id="cheese3" class="layer"><img src="../assets/img/burger2/cheese3.svg" alt=""></div>
        <div id="cheese2" class="layer"><img src="../assets/img/burger2/cheese2.svg" alt=""></div>
        <div id="cheese1" class="layer"><img src="../assets/img/burger2/cheese1.svg" alt=""></div>
        <div id="patty" class="layer"><img src="../assets/img/burger2/patty.svg" alt=""></div>
        <div id="tomatoes" class="layer"><img src="../assets/img/burger2/tomatoes.svg" alt=""></div>
        <div id="salad" class="layer"><img src="../assets/img/burger2/salad.svg" alt=""></div>
        <div id="bottomBun" class="layer"><img src="../assets/img/burger2/bottomBun.svg" alt=""></div>
        <div id="plate" class="layer"><img src="../assets/img/burger2/plate.svg" alt=""></div>
    </div>
</template>

<script>
    export default {
        name: 'Burger',
        props: {
            burgerAnimationTask: Array
        },
        data() {
            return {
                busy: false,
                unmounted: false,
                burgerPath: '../assets/img/burger/'
            }
        },
        watch: {
            burgerAnimationTask() {
                this.animate();
            }
        },
        methods: {
            animate() {
                if (this.busy) return;
                this.busy = true;
                this.$emit('busy', true);
                setTimeout(() => {
                    this.busy = false;
                    this.$emit('busy', false);
                }, 350);

                if (this.burgerAnimationTask.length === 0) {
                    document.querySelectorAll('.burger-animation .in').forEach(obj => {
                        obj.className = 'layer out-right';
                        setTimeout(() => {
                            obj.className = 'layer';
                        }, 350);
                    });
                    return;
                }

                let visible = Object.values(document.querySelectorAll('.burger-animation .in')).map(obj => obj.id);

                let entering = [];
                let leaving = visible.filter(oldObj => !this.burgerAnimationTask.find(obj => obj === oldObj));

                this.burgerAnimationTask.forEach(newObj => {
                    if (!visible.find(obj => obj === newObj)) {
                        entering.push(newObj);
                    }
                });

                let delay = 350 / Math.max(entering.length, leaving.length);

                entering.forEach((obj, i) => {
                    setTimeout(() => {
                        if (this.unmounted) return;
                        document.getElementById(obj).className = 'layer in';
                    }, delay * i);
                });

                leaving.forEach((obj, i) => {
                    setTimeout(() => {
                        if (this.unmounted) return;
                        document.getElementById(obj).className = 'layer out';
                        setTimeout(() => {
                            document.getElementById(obj).className = 'layer';
                        }, 350);
                    }, delay * i);
                });
            },
            jump() {
                if (this.busy) return;
                this.busy = true;
                this.$emit('busy', true);

                let visible = Object.values(document.querySelectorAll('.burger-animation .in'));

                let preDelay = 20;
                let inDelay = 60;
                let outDelay = 15;
                let postDelay = 10;

                let preCurve = 'ease-out-cubic';
                let inCurve = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
                let outCurve = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                let postCurve = 'ease-in-cubic';

                let preDuration = 20;
                let inDuration = 200;
                let outDuration = 200;
                let postDuration = 5;

                let preHeight = window.innerWidth < 991 ? '.02rem' : '.2rem';
                let inHeight = window.innerWidth < 991 ? '-1rem' : '-5rem';
                let outHeight = window.innerWidth < 991 ? '.05rem' : '.2rem';
                let postHeight = 0;

                let totalDelay = 0;
                for (let i = 0; i < visible.length; i++) {
                    setTimeout(() => {
                        visible[i].style.top = preHeight;
                        visible[i].style.transition = 'top ' + preDuration + 'ms ' + preCurve;
                    }, totalDelay + preDelay);
                    totalDelay += preDelay;
                }
                totalDelay += preDuration;

                for (let i = 0; i < visible.length; i++) {
                    setTimeout(() => {
                        visible[i].style.top = inHeight;
                        visible[i].style.transition = 'top ' + inDuration + 'ms ' + inCurve;
                    }, totalDelay + inDelay);
                    totalDelay += inDelay;
                }
                totalDelay += inDuration + 200;

                for (let i = visible.length - 1; i >= 0; i--) {
                    setTimeout(() => {
                        visible[i].style.top = outHeight;
                        visible[i].style.transition = 'top ' + outDuration + 'ms ' + outCurve;
                    }, totalDelay + outDelay);
                    totalDelay += outDelay;
                }
                totalDelay += outDuration + 10;

                for (let i = visible.length - 1; i >= 0; i--) {
                    setTimeout(() => {
                        visible[i].style.top = postHeight;
                        visible[i].style.transition = 'top ' + postDuration + 'ms ' + postCurve;
                    }, totalDelay + postDelay);
                    totalDelay += postDelay;
                }
                totalDelay += postDuration;

                setTimeout(() => {
                    this.busy = false;
                    this.$emit('busy', false);
                    for (let i = 0; i < visible.length; i++) {
                        visible[i].style.top = '';
                        visible[i].style.transition = '';
                    }
                }, totalDelay + 50);
            }
        },
        mounted() {
            let vm = this;

            setTimeout(() => {
                vm.animate();
            }, 100);
        },
        beforeDestroy() {
            this.unmounted = true;
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    .burger-animation {
        .layer {
            position: relative;
            margin: 0 auto;
            transition: top .3s, transform .3s, opacity .3s, height .1s;
            opacity: 0;
            height: 0;
            top: -1rem;
            max-width: 250px;
            transform: none;
            pointer-events: none;

            img {
                text-align: center;
                margin: 0 auto;
            }

            &.in, &#plate {
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

        #topBun {
            &.in, &.out, &.out-right {
                height: 6.1rem;
                width: 74%;
                z-index: 8;
            }
        }
        #sauce {
            &.in, &.out, &.out-right {
                height: .15rem;
                width: 60%;
                z-index: 7;
                left: -.6rem;
            }
        }
        #cheese3 {
            &.in, &.out, &.out-right {
                height: .5rem;
                width: 95%;
                z-index: 6;
            }
        }
        #cheese2 {
            &.in, &.out, &.out-right {
                height: .5rem;
                width: 75%;
                z-index: 5;
            }
        }
        #cheese1 {
            &.in, &.out, &.out-right {
                height: 1.7rem;
                width: 100%;
                z-index: 4;
            }
        }
        #patty {
            &.in, &.out, &.out-right {
                height: 1.0rem;
                width: 70%;
                z-index: 3;
            }
        }
        #tomatoes {
            &.in, &.out, &.out-right {
                height: .4rem;
                width: 69%;
                z-index: 2;
            }
        }
        #salad {
            &.in, &.out, &.out-right {
                height: 1.2rem;
                width: 100%;
                z-index: 1;
            }
        }
        #bottomBun {
            &.in, &.out, &.out-right {
                height: 2.8rem;
                width: 72%;
                z-index: 0;
            }
        }
        #plate {
            &.in, &.out, &.out-right {
                height: auto;
                width: 100%;
                z-index: 0;
            }
        }

        &.alternate-burger {
            #topBun {
                &.in, &.out, &.out-right {
                    height: 5.3rem;
                    /*height: 8.6rem;*/
                    width: 97%;
                    z-index: 8;
                }
            }
            #sauce {
                &.in, &.out, &.out-right {
                    height: .55rem;
                    width: 58%;
                    z-index: 7;
                }
            }
            #cheese3 {
                &.in, &.out, &.out-right {
                    height: .8rem;
                    width: 94%;
                    z-index: 6;
                }
            }
            #cheese2 {
                &.in, &.out, &.out-right {
                    height: .8rem;
                    width: 93%;
                    z-index: 5;
                }
            }
            #cheese1 {
                &.in, &.out, &.out-right {
                    height: .8rem;
                    width: 95%;
                    z-index: 4;
                }
            }
            #tomatoes {
                &.in, &.out, &.out-right {
                    height: .9rem;
                    width: 78%;
                    z-index: 3;
                }
            }
            #salad {
                &.in, &.out, &.out-right {
                    height: .9rem;
                    width: 100%;
                    z-index: 2;
                }
            }
            #patty {
                &.in, &.out, &.out-right {
                    height: 2.1rem;
                    width: 95%;
                    z-index: 0;
                }
            }
            #bottomBun {
                &.in, &.out, &.out-right {
                    height: 1.9rem;
                    width: 100%;
                    z-index: 1;
                }
            }
        }
    }
    @include media-breakpoint-down('md') {
        .burger-animation {
            min-height: unset;
        }
    }
    @include media-breakpoint-down('sm') {
        .burger-animation {
            max-width: 80px;
            margin: 0 auto;

            .layer {
                top: -.5rem;
            }

            #topBun { &.in, &.out, &.out-right { height: 1.5rem; width: 90%; } }

            #sauce { &.in, &.out, &.out-right { height: .4rem; width: 60%; left: 0; } }

            #cheese3 { &.in, &.out, &.out-right { height: .1rem; width: 95%; } }

            #cheese2 { &.in, &.out, &.out-right { height: .2rem; width: 95%; } }

            #cheese1 { &.in, &.out, &.out-right { height: .05rem; width: 100%; } }

            #patty { &.in, &.out, &.out-right { height: .3rem; width: 90%; } }

            #tomatoes { &.in, &.out, &.out-right { height: .4rem; width: 85%; } }

            #salad { &.in, &.out, &.out-right { height: .38rem; width: 100%; } }

            #bottomBun { &.in, &.out, &.out-right { height: .55rem; width: 90%; } }

            #plate { &.in, &.out, &.out-right { height: auto; } }

            &.alternate-burger {
                #topBun { &.in, &.out, &.out-right { height: 1.05rem; } }

                #sauce { &.in, &.out, &.out-right { height: .15rem; } }

                #cheese3 { &.in, &.out, &.out-right { height: .25rem; } }

                #cheese2 { &.in, &.out, &.out-right { height: .2rem; } }

                #cheese1 { &.in, &.out, &.out-right { height: .18rem; } }

                #tomatoes { &.in, &.out, &.out-right { height: .45rem; } }

                #salad { &.in, &.out, &.out-right { height: .25rem; } }

                #patty { &.in, &.out, &.out-right { height: .5rem; } }

                #bottomBun { &.in, &.out, &.out-right { height: .45rem; } }

                #plate { &.in, &.out, &.out-right { height: auto; } }
            }
        }
    }
</style>