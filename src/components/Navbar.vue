<template>
    <div id="navbar">
        <b-navbar toggleable="sm" type="dark" variant="dark">
            <div class="nav-button prev d-sm-none">
                <router-link :to="prevRoute">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"/></svg>
                </router-link>
            </div>

            <b-navbar-brand to="/">Burger-Loop</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <div class="nav-button next d-sm-none">
                <router-link :to="nextRoute">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="white" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"/></svg>
                </router-link>
            </div>

            <b-collapse is-nav id="nav_collapse" class="ml-2 mr-auto">
                <b-navbar-nav>
                    <b-nav-item to="/if">
                        <b-btn :variant="$route.path === '/if' ? 'primary' : 'secondary'">
                            If
                        </b-btn>
                    </b-nav-item>
                    <b-nav-item to="/while">
                        <b-btn :variant="$route.path === '/while' ? 'primary' : 'secondary'">
                            While
                        </b-btn>
                    </b-nav-item>
                    <b-nav-item to="/do-while">
                        <b-btn :variant="$route.path === '/do-while' ? 'primary' : 'secondary'">
                            Do While
                        </b-btn>
                    </b-nav-item>
                    <b-nav-item to="/for">
                        <b-btn :variant="$route.path === '/for' ? 'primary' : 'secondary'">
                            For
                        </b-btn>
                    </b-nav-item>
                    <b-nav-item to="/foreach">
                        <b-btn :variant="$route.path === '/foreach' ? 'primary' : 'secondary'">
                            Foreach
                        </b-btn>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        components: {},
        directives: {},
        props: {},
        data() {
            return {
                routes: [ '/if', '/while', '/do-while', '/for', '/foreach' ],
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
        },
        watch: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .nav-button {
        width: 1rem;
        height: 1rem;
        position: relative;
        top: -.85rem;
    }
    .navbar-toggler {
        border: none;
        margin-left: auto;
        margin-right: 1rem;
        padding: 0;
    }
    .navbar-brand {
        margin-left: 1rem;
    }
</style>