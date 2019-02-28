<template>
    <div id="navbar">
        <b-navbar toggleable="sm" type="dark" variant="dark">
            <!--<div class="container">-->
                <b-navbar-brand to="/">Burger Loop</b-navbar-brand>

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
                    <b-navbar-nav>
                        <b-nav-item to="/if">
                            <b-button :variant="$route.path === '/if' ? navbarItemActiveColor : navbarItemDefaultColor" @click="blockRouteTransition">
                                if
                            </b-button>
                        </b-nav-item>
                        <b-nav-item to="/while">
                            <b-button :variant="$route.path === '/while' ? navbarItemActiveColor : navbarItemDefaultColor" @click="blockRouteTransition">
                                while
                            </b-button>
                        </b-nav-item>
                        <b-nav-item to="/do-while">
                            <b-button :variant="$route.path === '/do-while' ? navbarItemActiveColor : navbarItemDefaultColor" @click="blockRouteTransition">
                                do while
                            </b-button>
                        </b-nav-item>
                        <b-nav-item to="/for">
                            <b-button :variant="$route.path === '/for' ? navbarItemActiveColor : navbarItemDefaultColor" @click="blockRouteTransition">
                                for
                            </b-button>
                        </b-nav-item>
                        <b-nav-item to="/foreach">
                            <b-button :variant="$route.path === '/foreach' ? navbarItemActiveColor : navbarItemDefaultColor" @click="blockRouteTransition">
                                foreach
                            </b-button>
                        </b-nav-item>
                    </b-navbar-nav>
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
            routes: Array
        },
        data() {
            return {
                navbarItemDefaultColor: 'secondary',
                navbarItemActiveColor: 'primary',
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
            },
        },
        methods: {
            blockRouteTransition() {
                window.blockRouteTransition = true;
            }
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
    }
    .nav-item {
        .btn {
            white-space: nowrap;
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
            width: 8rem;
            transform: translateX(50%);
            text-align: center;
            background: inherit;
            padding: 1rem;
            border-radius: 5px 5px 0 0;
            box-shadow: 0 0 1rem -.2rem rgba(black, 40);
            z-index: -1;

            .nav-item {
                &:last-child {
                    .nav-link {
                        padding-bottom: 0;
                    }
                }
                .nav-link {
                    padding: 0 0 1rem;

                    .btn {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>