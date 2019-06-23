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
                routes: [ '/if', '/while', '/do-while', '/array', '/for', '/map', '/foreach' ],
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
                    this.transitionName = 'fade';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                let toIndex = this.routes.findIndex(r => r === to.path);
                let fromIndex = this.routes.findIndex(r => r === from.path);
                this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';

                let oldContentEl = document.querySelector('#content .content-wrapper');

                if (!oldContentEl) return;

                let oldContent = oldContentEl.cloneNode(true);

                oldContent.setAttribute('id', 'content-old');
                oldContent.classList.add(this.transitionName + '-leave-to');
                oldContent.classList.add(this.transitionName + '-leave-active');

                document.getElementById('content').append(oldContent);

                setTimeout(() => {
                    oldContent.classList.remove(this.transitionName + '-leave-to');
                    oldContent.classList.remove(this.transitionName + '-leave-active');
                    oldContent.remove();
                }, 300);
            }
        }
    }
</script>

<style lang="scss">
  @import './assets/_variables.scss';

  body {
    overflow-x: hidden;
  }
  #content {
    position: relative;
    margin-top: 2rem;
    margin-bottom: 3rem;

    .intro {
      height: 8rem;
    }

    h2 {
      margin-bottom: 1.25rem;
    }
  }
  #content-old {
    position: absolute;
    top: -1rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
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
      top: calc(100vh - 4.4rem);
      left: 0;
      right: 0;
      z-index: 100;
      width: 100vw;
    }
    #content {
      margin-top: 2rem;
      margin-bottom: 7rem;

      .intro {
        height: 9rem;
      }
    }
  }
  @include media-breakpoint-down('md') {
    #content {
      margin-top: 1.8rem;
      margin-bottom: 7rem;

      .intro {
        height: 10rem;
      }
    }
  }
  @include media-breakpoint-down('sm') {
    #content {
      margin-top: 2rem;
      margin-bottom: 6.5rem;
      .intro {
        height: 16rem;
      }
    }
  }
  @include media-breakpoint-down('xs') {
    #navbar {
      top: calc(100vh - 3.9rem);
    }
    #content {
      margin-top: 1rem;
      margin-bottom: 6rem;
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
  $route-transition-pause: .0s;

  .slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active {
  }
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
    opacity: 1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease-in;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(.1rem);
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
    .fade-enter, .fade-leave-to {
      transform: translateY(-.35rem);
    }
  }
</style>