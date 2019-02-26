<template>
    <div @click="jump" id="burger-animation" class="burger-animation">
        <div id="topBun" class="layer"><img src="../assets/img/burger/topBun.svg" alt=""></div>
        <div id="sauce" class="layer"><img src="../assets/img/burger/sauce.svg" alt=""></div>
        <div id="cheese3" class="layer"><img src="../assets/img/burger/cheese3.svg" alt=""></div>
        <div id="cheese2" class="layer"><img src="../assets/img/burger/cheese2.svg" alt=""></div>
        <div id="cheese1" class="layer"><img src="../assets/img/burger/cheese1.svg" alt=""></div>
        <div id="tomatoes" class="layer"><img src="../assets/img/burger/tomatoes.svg" alt=""></div>
        <div id="salad" class="layer"><img src="../assets/img/burger/salad.svg" alt=""></div>
        <div id="patty" class="layer"><img src="../assets/img/burger/patty.svg" alt=""></div>
        <div id="bottomBun" class="layer"><img src="../assets/img/burger/bottomBun.svg" alt=""></div>
        <div id="plate" class="layer"><img src="../assets/img/burger/plate.svg" alt=""></div>
    </div>
</template>

<script>
    import BButtonToolbar from "bootstrap-vue/src/components/button-toolbar/button-toolbar";
    export default {
        name: 'Burger',
        components: {BButtonToolbar},
        directives: {},
        props: {
            burgerAnimationTask: Array
        },
        data() {
            return {
                unmounted: false,
                burgerPath: '../assets/img/burger/'
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
                this.$emit('busy', true);
                setTimeout(() => {
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
                this.$emit('busy', true);

                let visible = Object.values(document.querySelectorAll('.burger-animation .in'));

                let delay = 66;
                for (let i = 0; i < visible.length; i++) {
                    setTimeout(() => {
                        visible[i].style.top = window.innerWidth < 991 ? '-2rem' : '-5rem';
                    }, delay * i);
                }
                setTimeout(() => {
                    for (let i = 0; i < visible.length; i++) {
                        visible[i].style.top = '0';
                        visible[i].style.transition = 'top .15s';
                    }
                }, delay * visible.length + 200);

                setTimeout(() => {
                    this.$emit('busy', false);
                    for (let i = 0; i < visible.length; i++) {
                        visible[i].style.transition = '';
                    }
                }, delay * visible.length + 600);
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
                /*height: 1.5rem;*/
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
                /*height: 3.4rem;*/
                width: 100%;
                z-index: 1;
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
    @media screen and (max-width: 767px) {
        .burger-animation {
            max-width: 80px;
            margin: 0 auto;

            .layer {
                top: -.5rem;
            }

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
</style>