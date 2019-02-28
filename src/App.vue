<template>
  <div id="app">
    <Navbar :routes="routes"></Navbar>
    <div id="content">
      <transition :name="routeTransitions ? transitionName : ''" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    export default {
        components: {Navbar},
        data() {
            return {
                routes: [ '/', '/if', '/while', '/do-while', '/for', '/foreach' ],
                transitionName: 'slide-left'
            }
        },
        computed: {
            routeTransitions() {
                return window.routeTransitions;
            }
        },
        watch: {
            /* Optional Design: Route Transitions */
            $route(to, from) {
                if (!this.routeTransitions || window.blockRouteTransition) {
                    window.blockRouteTransition = false;
                    this.transitionName = '';
                    return;
                }

                let toIndex = this.routes.findIndex(r => r === to.path);
                let fromIndex = this.routes.findIndex(r => r === from.path);
                this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';

                let oldContent = document.getElementById('content').cloneNode(true);
                oldContent.setAttribute('id', 'content-old');
                document.body.append(oldContent);

                oldContent.classList.add(this.transitionName + '-leave-to');
                setTimeout(() => {
                    oldContent.classList.remove(this.transitionName + '-leave-to');
                    oldContent.remove();
                }, 200);
            }
        }
    }
</script>

<style lang="scss">
  @import './assets/_variables.scss';

  body {
    overflow-x: hidden;
  }
  #content, #content-old {
    margin-top: 2.5rem;
    margin-bottom: 2rem;

    .intro {
      height: 8rem;
    }

    h2 {
      margin-bottom: 1.25rem;
    }
  }
  .btn {
    box-shadow: 0 0 1rem -.2rem rgba($black, .3);
  }
  .btn:disabled, .btn[disabled], .btn.disabled {
    opacity: .3 !important;
  }

  * > .tooltip.show {
    transition: opacity .15s;

    .tooltip-inner {
      box-shadow: $box-shadow;
    }
  }

  code {
    font-size: 95% !important;

    &.light {
        background: $light;
        color: $gray-700;
    }
  }

  .no-bg {
    background: transparent !important;
  }

  @include media-breakpoint-down('lg') {
    #navbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    #content {
      margin-top: 2rem;
      margin-bottom: 6rem;

      .intro {
        height: 9rem;
      }
    }
  }
  @include media-breakpoint-down('md') {
    #content {
      margin-top: 2.5rem;
      margin-bottom: 5rem;

      .intro {
        height: 10rem;
      }
    }
  }
  @include media-breakpoint-down('sm') {
    #content {
      .intro {
        height: 15rem;
      }
    }
  }
  @include media-breakpoint-down(400) {
    #content {
      .display {
        font-size: 3rem;
        font-weight: 600;
      }
      .lead {
        line-height: 1.2;
      }
    }
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  $slide-distance: 40%;
  $slide-opacity: 0;
  $route-transition-duration: .25s;
  $route-transition-pause: .1s;

  .slide-left-enter-active, .slide-right-enter-active {
    transition: all $route-transition-duration $route-transition-pause cubic-bezier(0.25, 0.46, 0.45, 0.94);
    min-height: calc(100vh - 5rem);
      position: absolute;
      top: 0;
      max-width: 100%;
  }
  .slide-left-leave-active, .slide-right-leave-active {
    transition: all $route-transition-duration cubic-bezier(0.55, 0.085, 0.68, 0.53);
      position: absolute;
      top: 0;
      max-width: 100%;
  }
  .slide-left-enter, .slide-right-leave-to {
    transform: translateX($slide-distance);
    opacity: $slide-opacity;
    min-height: calc(100vh - 5rem);
  }
  .slide-right-enter, .slide-left-leave-to {
    transform: translateX(-$slide-distance);
    opacity: $slide-opacity;
    min-height: calc(100vh - 5rem);
  }
  .slide-left-enter-to, .slide-right-leave, .slide-right-enter-to, .slide-left-leave {
    transform: none;
    opacity: 1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  @include media-breakpoint-down('sm') {
    $slide-distance: 10%;
    $slide-opacity: 0;
    $route-transition-duration: .2s;
    $route-transition-pause: .03s;

    .slide-left-enter-active, .slide-right-enter-active {
      transition: all $route-transition-duration $route-transition-pause cubic-bezier(0.25, 0.46, 0.45, 0.94);
      min-height: calc(100vh - 5rem);
    }
    .slide-left-leave-active, .slide-right-leave-active {
      transition: all $route-transition-duration cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }
    .slide-left-enter, .slide-right-leave-to {
      transform: translateX($slide-distance);
      opacity: $slide-opacity;
      min-height: calc(100vh - 5rem);
    }
    .slide-right-enter, .slide-left-leave-to {
      transform: translateX(-$slide-distance);
      opacity: $slide-opacity;
      min-height: calc(100vh - 5rem);
    }
    .slide-left-enter-to, .slide-right-leave, .slide-right-enter-to, .slide-left-leave {
      transform: none;
      opacity: 1;
    }
  }
</style>