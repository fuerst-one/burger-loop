<template>
    <div @click="jump" id="burger-animation" class="burger-animation no-select">
        <div v-show="showHeatwaves" class="heatwaves">
            <svg id="heatwave1"><path d=""></path></svg>
            <svg id="heatwave2"><path d=""></path></svg>
            <svg id="heatwave3"><path d=""></path></svg>
        </div>

        <div id="topBun" class="layer"><img src="../assets/img/burger1/topBun.svg" alt=""></div>
        <div id="sauce" class="layer"><img src="../assets/img/burger1/sauce.svg" alt=""></div>
        <div id="cheese3" class="layer"><img src="../assets/img/burger1/cheese3.svg" alt=""></div>
        <div id="cheese2" class="layer"><img src="../assets/img/burger1/cheese2.svg" alt=""></div>
        <div id="cheese1" class="layer"><img src="../assets/img/burger1/cheese1.svg" alt=""></div>
        <div id="tomatoes" class="layer"><img src="../assets/img/burger1/tomatoes.svg" alt=""></div>
        <div id="salad" class="layer"><img src="../assets/img/burger1/salad.svg" alt=""></div>
        <div id="patty" class="layer"><img src="../assets/img/burger1/patty.svg" alt=""></div>
        <div id="bottomBun" class="layer"><img src="../assets/img/burger1/bottomBun.svg" alt=""></div>
        <div id="plate" class="layer"><img src="../assets/img/burger1/plate.svg" alt=""></div>

        <!--<div id="coke" class="layer single"><img src="../assets/img/burger1/coke.svg" alt=""></div>-->
        <!--<div id="milkshake" class="layer single"><img src="../assets/img/burger1/milkshake.svg" alt=""></div>-->
        <!--<div id="fries" class="layer single"><img src="../assets/img/burger1/fries.svg" alt=""></div>-->
    </div>
</template>

<script>
    export default {
        name: 'Burger',
        props: {
            burgerAnimationTask: Array,
            showHeatwaves: Boolean
        },
        data() {
            return {
                busy: false,
                unmounted: false
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

                document.querySelector('.heatwaves').style.opacity = 0;

                let visible = Object.values(document.querySelectorAll('.burger-animation .in'));

                let preDelay = 20;
                let inDelay = 38;
                let outDelay = 15;
                let postDelay = 10;

                let preCurve = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
                let inCurve = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                let outCurve = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
                let postCurve = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                let preDuration = 20;
                let inDuration = 200;
                let outDuration = 200;
                let postDuration = 5;

                let preHeight = window.innerWidth < 991 ? '.02rem' : '.2rem';
                let inHeight = window.innerWidth < 991 ? -1.5 : -7.5;
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
                        visible[i].style.top = inHeight * (1 - i / 35) + 'rem';
                        visible[i].style.transition = 'top ' + inDuration + 'ms ' + inCurve;
                    }, totalDelay + inDelay);
                    totalDelay += inDelay;
                }
                totalDelay += inDuration + visible.length * 20;

                for (let i = visible.length - 1; i >= 0; i--) {
                    setTimeout(() => {
                        visible[i].style.top = outHeight;
                        visible[i].style.transform = '';
                        visible[i].style.transition = 'top ' + outDuration + 'ms ' + outCurve;
                    }, totalDelay + outDelay);
                    totalDelay += outDelay + 20;
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
                    document.querySelector('.heatwaves').style.opacity = 1;
                    for (let i = 0; i < visible.length; i++) {
                        visible[i].style.top = '';
                        visible[i].style.transition = '';
                    }
                }, totalDelay + 50);
            },
            animateHeatwave() {
                let vm = this;
                let ys = [];
                for (let i = 0; i <= 80; i++) {
                    ys.push(i);
                }

                let t = 0;

                function animate() {
                    let points = ys.map(y => {

                        let x = 15 + 10 * Math.sin((y + t) / 16);

                        return [x, y];
                    });

                    let path = "M" + points.map(p => {
                        return p[0] + "," + p[1];
                    }).join(" L");

                    document.querySelector("#heatwave1 path").setAttribute("d", path);
                    document.querySelector("#heatwave2 path").setAttribute("d", path);
                    document.querySelector("#heatwave3 path").setAttribute("d", path);

                    t += .7;

                    if (!vm.unmounted) setTimeout(animate, 50);
                }

                animate();
            }
        },
        mounted() {
            let vm = this;

            setTimeout(() => {
                vm.animate();
            }, 100);

            if (window.innerWidth > 991) {
                setTimeout(() => {
                    document.querySelector('.heatwaves').style.opacity = 1;
                    vm.animateHeatwave();
                }, 1000);
            }
        },
        beforeDestroy() {
            this.unmounted = true;
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';

    $max-width: 250px;

    .burger-animation {
        .heatwaves {
            position: absolute;
            top: -135px;
            width: 100%;
            z-index: 1;
            transition: opacity 1s;
            opacity: 0;
            text-align: center;

            svg {
                width: 30px;
                height: 100px;
                margin: 30px 15px;
                overflow: visible;

                &:nth-of-type(2) {
                    margin-top: 0;
                }
            }

            path {
                stroke: $light;
                stroke-width: 8px;
                stroke-linecap: round;
                fill: none;
            }
        }
        .layer {
            position: relative;
            margin: 0 auto;
            transition: top .3s, transform .3s, opacity .3s, width .3s;
            opacity: 0;
            height: 0;
            top: -3rem;
            width: $max-width;
            pointer-events: none;
            transform: none;

            img {
                text-align: center;
                margin: 0 auto;
            }

            &.in, &#plate {
                opacity: 1;
                top: 0;
                transform: none;
            }

            &.out {
                top: -1rem;
                opacity: 0;
                transform: none;
            }
            &.out-right {
                top: 0;
                opacity: 0;
                transform: translateX(7rem);
            }
        }

        #topBun {
            &.in, &.out, &.out-right {
                height: 4.7rem;
                width: 76%;
                z-index: 8;
            }
        }
        #sauce {
            &.in, &.out, &.out-right {
                height: .28rem;
                width: 50%;
                z-index: 7;
            }
        }
        #cheese3 {
            &.in, &.out, &.out-right {
                height: .75em;
                width: 75.5%;
                z-index: 6;
            }
        }
        #cheese2 {
            &.in, &.out, &.out-right {
                height: .6rem;
                width: 76%;
                z-index: 5;
            }
        }
        #cheese1 {
            &.in, &.out, &.out-right {
                height: .5rem;
                width: 76%;
                z-index: 4;
            }
        }
        #tomatoes {
            &.in, &.out, &.out-right {
                height: .4rem;
                width: 70%;
                z-index: 3;
            }
        }
        #salad {
            &.in, &.out, &.out-right {
                height: .8rem;
                width: 80%;
                z-index: 2;
            }
        }
        #patty {
            &.in, &.out, &.out-right {
                height: 1.7rem;
                width: 74%;
                z-index: 0;
            }
        }
        #bottomBun {
            &.in, &.out, &.out-right {
                height: 1rem;
                width: 76%;
                z-index: 0;
            }
        }
        #plate {
            &.in, &.out, &.out-right {
                height: auto;
                width: 100%;
                z-index: 1;
            }
        }

        /*#topBun {
            &.in, &.out, &.out-right {
                height: 5.3rem;
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
        #plate {
            &.in, &.out, &.out-right {
                height: auto;
                width: 100%;
                z-index: 0;
            }
        }*/
    }
    @include media-breakpoint-down('md') {
        .burger-animation {
            min-height: unset;
        }
    }
    @include media-breakpoint-down('sm') {
        $max-width-mobile: 80px;

        .burger-animation {
            margin: 0 auto;
            width: $max-width-mobile;

            .heatwaves {
                display: none;
            }

            .layer {
                top: -.5rem;
                width: $max-width-mobile;

                &.out-right {
                    transform: translateX(1rem);
                }
            }

            #topBun { &.in, &.out, &.out-right { height: 1.05rem; width: 100%; } }

            #sauce { &.in, &.out, &.out-right { height: .15rem; width: 60%; } }

            #cheese3 { &.in, &.out, &.out-right { height: .25rem; width: 100%; } }

            #cheese2 { &.in, &.out, &.out-right { height: .2rem; width: 100%; } }

            #cheese1 { &.in, &.out, &.out-right { height: .18rem; width: 100%; } }

            #tomatoes { &.in, &.out, &.out-right { height: .35rem; width: 100%; } }

            #salad { &.in, &.out, &.out-right { height: .25rem; width: 100%; } }

            #patty { &.in, &.out, &.out-right { height: .5rem; width: 100%; } }

            #bottomBun { &.in, &.out, &.out-right { height: .4rem; width: 100%; } }

            #plate { &.in, &.out, &.out-right { height: auto; width: 100%; } }
        }
    }
</style>