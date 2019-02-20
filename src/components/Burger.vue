<template>
    <div class="burger-animation">
        <div id="topBun" class="layer"><img src="../assets/img/burger/topBun.svg" alt=""></div>
        <div id="sauce" class="layer"><img src="../assets/img/burger/sauce.svg" alt=""></div>
        <div id="cheese3" class="layer"><img src="../assets/img/burger/cheese3.svg" alt=""></div>
        <div id="cheese2" class="layer"><img src="../assets/img/burger/cheese2.svg" alt=""></div>
        <div id="cheese1" class="layer"><img src="../assets/img/burger/cheese.svg" alt=""></div>
        <div id="tomatoes" class="layer"><img src="../assets/img/burger/tomatoes.svg" alt=""></div>
        <div id="salad" class="layer"><img src="../assets/img/burger/salad.svg" alt=""></div>
        <div id="patty" class="layer"><img src="../assets/img/burger/patty.svg" alt=""></div>
        <div id="bottomBun" class="layer"><img src="../assets/img/burger/bottomBun.svg" alt=""></div>
        <div id="plate" class="layer"><img src="../assets/img/burger/plate.svg" alt=""></div>
    </div>
</template>

<script>
    export default {
        name: 'Burger',
        components: {},
        directives: {},
        props: {
            burgerAnimationTask: Array
        },
        data() {
            return {
                unmounted: false
            }
        },
        computed: {},
        watch: {
            burgerAnimationTask() {
                this.animate();
            }
        },
        methods: {
            animate() {
                if (this.burgerAnimationTask.length === 0) {
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
                let leaving = visibleObjs.filter(oldObj => !this.burgerAnimationTask.find(obj => obj === oldObj));

                this.burgerAnimationTask.forEach(newObj => {
                    if (!visibleObjs.find(obj => obj === newObj)) {
                        entering.push(newObj);
                    }
                });

                let delay = 500 / Math.max(entering.length, leaving.length);

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

    .burger-animation {
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
                height: 2.4rem;
                width: 100%;
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
    }
    @media screen and (max-width: 991px) {
        .burger-animation {
            min-height: unset;
        }
    }
    @media screen and (max-width: 768px) {
        .burger-animation {
            max-width: 80px;
            margin: 0 auto;

            .layer {
                top: -.5rem;
            }

            #topBun { &.in, &.out, &.out-right { height: 1.1rem; } }

            #sauce { &.in, &.out, &.out-right { height: .2rem; } }

            #cheese3 { &.in, &.out, &.out-right { height: .25rem; } }

            #cheese2 { &.in, &.out, &.out-right { height: .2rem; } }

            #cheese1 { &.in, &.out, &.out-right { height: .18rem; } }

            #tomatoes { &.in, &.out, &.out-right { height: .5rem; } }

            #salad { &.in, &.out, &.out-right { height: .2rem; } }

            #patty { &.in, &.out, &.out-right { height: .5rem; } }

            #bottomBun { &.in, &.out, &.out-right { height: .4rem; } }

            #plate { &.in, &.out, &.out-right { height: auto; } }
        }
    }
</style>