<template>
    <div id="navbar">
        <b-navbar toggleable="sm" type="dark" variant="dark">
            <!--<div class="container">-->
                <b-navbar-brand to="/">
                    <div @click="blockRouteTransition">
                        <img src="../assets/img/burger.svg" alt="Burger Loop Logo" class="burger-logo">
                        Burger Loop
                    </div>
                </b-navbar-brand>

                <div class="nav-button prev d-sm-none ml-auto">
                    <b-button variant="dark" v-if="prevRoute !== '/foreach'" :to="prevRoute">
                        <svg height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path></svg>
                    </b-button>
                </div>

                <b-navbar-toggle target="nav-collapse" class="mx-2" />

                <div class="nav-button next d-sm-none">
                    <b-button variant="dark" :to="nextRoute">
                        <svg height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                    </b-button>
                </div>

                <b-collapse is-nav id="nav-collapse" class="ml-2 mr-auto text-center text-sm-left">
                    <b-navbar-nav id="navbar-nav">
                        <b-nav-item v-for="(route, i) in routes" :to="route" :key="i">
                            <b-button :variant="navItemColor(route)" @click="blockRouteTransition">
                                {{ route }} <svg v-if="badges && badges.find(b => b === route.slice(1))" height="17px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                            </b-button>
                        </b-nav-item>
                        <b-nav-item to="/impressum">
                            <b-button variant="dark" class="text-muted text-center">Impressum</b-button>
                        </b-nav-item>
                    </b-navbar-nav>
                    <div class="hint before" :class="{ active: beforeHintVisible }"></div>
                    <div class="hint after" :class="{ active: afterHintVisible }"></div>
                </b-collapse>
            <!--</div>-->
        </b-navbar>
    </div>
</template>

<script>
    import BNavbar from "bootstrap-vue/src/components/navbar/navbar";
    import BNavbarBrand from "bootstrap-vue/src/components/navbar/navbar-brand";
    import BNavbarToggle from "bootstrap-vue/src/components/navbar/navbar-toggle";
    import BCollapse from "bootstrap-vue/src/components/collapse/collapse";
    import BNavbarNav from "bootstrap-vue/src/components/navbar/navbar-nav";
    import BNavItem from "bootstrap-vue/src/components/nav/nav-item";
    import BButton from "bootstrap-vue/src/components/button/button";
    export default {
        name: 'Navbar',
        components: {BButton, BNavItem, BNavbarNav, BCollapse, BNavbarToggle, BNavbarBrand, BNavbar},
        props: {
            routes: Array,
            badges: Array
        },
        data() {
            return {
                navbarItemDefaultColor: 'secondary',
                navbarItemActiveColor: 'primary',
                beforeHintVisible: false,
                afterHintVisible: false,
            }
        },
        computed: {
            activeRoute() {
                return this.routes.findIndex(r => r === this.$route.path);
            },
            prevRoute() {
                return this.routes[this.activeRoute === 0 ? this.routes.length - 1 : this.activeRoute - 1] || '/';
            },
            nextRoute() {
                return this.routes[this.activeRoute === this.routes.length ? 0 : this.activeRoute + 1] || '/';
            }
        },
        methods: {
            blockRouteTransition() {
                window.blockRouteTransition = true;
            },
            navItemColor(pathName) {
                return this.$route.path === pathName ? this.navbarItemActiveColor : this.navbarItemDefaultColor;
            }
        },
        mounted() {
            let vm = this;
            setTimeout(() => {
                document.getElementById('navbar-nav').addEventListener("scroll", event => {
                    window.requestAnimationFrame(() => {
                        vm.beforeHintVisible = window.innerWidth < 1110 && event.target.scrollLeft !== 0;
                        vm.afterHintVisible = window.innerWidth < 1110 && event.target.scrollLeft + event.target.offsetWidth < event.target.scrollWidth;
                    });
                });

                vm.afterHintVisible = window.innerWidth < 1053;
            }, 300);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/variables';


    .nav-button {
        position: relative;
    }
    .navbar-toggler {
        border: none;
        margin-left: auto;
        margin-right: 1rem;
        padding: 0;
        outline: none;
    }
    .navbar-brand {
        margin-left: 1rem;

        .burger-logo {
            height: 1.7rem;
            width: auto;
            margin-bottom: .2rem;
            margin-right: .4rem;
        }
    }
    .navbar-nav {
        max-width: calc(100vw - 14.5rem);
        flex-basis: 0 0;
        overflow-x: auto;
        scrollbar-color: $black $dark;
        scrollbar-width: thin;
        &::-webkit-scrollbar {
            height: 5px;
        }
        &::-webkit-scrollbar-track {
            background: $dark;
            border-radius: $border-radius;
        }
        &::-webkit-scrollbar-thumb {
            height: 5px;
            margin: 0 auto;
            background: $black;
            border-radius: $border-radius;
            &:hover {
                background: $gray-600;
            }
        }
    }

    #nav-collapse {
        position: relative;

        .hint {
            position: absolute;
            top: .2rem;
            bottom: .2rem;
            width: .3rem;
            background: rgba($black, .5);
            opacity: 0;
            z-index: 5;

            &.before { left: -.1rem; border-radius: 0 50% 50% 0; }
            &.after { right: -.1rem; border-radius: 50% 0 0 50%; }

            &.active {
                opacity: 1;
            }
        }
    }
    .nav-item {
        a {
            padding: 0 !important;
            margin: .5rem;
        }
        .btn {
            white-space: nowrap;
            font-family: $font-family-monospace;

            svg {
                height: 14px;
                margin-top: -2px;
                fill: $success;
            }
        }

        .nav-link.router-link-active .btn svg {
            fill: $white !important;
        }
    }

    @include media-breakpoint-only('xs') {
        #navbar {
            .navbar {
                box-shadow: 0 0 1rem -.2rem rgba(black, 40);
            }
        }
        #nav-collapse {
            position: absolute;
            bottom: 3.8rem;
            right: 4.8rem;
            width: 10rem;
            transform: translateX(50%);
            text-align: center;
            background: inherit;
            padding: 1rem 1rem .25rem 1rem;
            border-radius: 5px 5px 0 0;
            box-shadow: 0 0 1rem -.2rem rgba(black, 40);
            z-index: -1;

            .nav-item {
                a {
                    padding: 0 !important;
                    margin: 0 0 .75rem 0;
                }
                &:last-child {
                    .nav-link {
                        padding-bottom: 0;
                    }
                }
                .nav-link {
                    padding: 0 0 1rem;

                    .btn {
                        width: 100%;
                        text-align: left;
                        svg {
                            float: right;
                            margin-top: .3rem;
                        }
                    }
                }
            }
        }
    }
</style>