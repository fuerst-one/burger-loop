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
                if (!this.routeTransitions) return;

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

  p {
    font-size: .95rem;
  }
  #content {
    margin-top: 4rem;
    margin-bottom: 2rem;
    .lead {
      height: 62px;
    }
  }

  .btn:disabled, .btn[disabled], .btn.disabled {
    opacity: .3 !important;
  }
  * > .tooltip.show {
    transition: opacity .15s;

    .tooltip-inner {
      box-shadow: $box-shadow;
    }

    /*&:hover {
      opacity: 0 !important;
    }*/
  }

  code {
    font-size: 95% !important;
  }

  .no-bg {
    background: transparent !important;
  }

  @media screen and (max-width: 991px) {
    #navbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    #content {
      margin-top: 3.5rem;
      margin-bottom: 6rem;

      .lead {
        height: 109px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    #content {
      margin-top: 2rem;
      margin-bottom: 5rem;

      .lead {
        height: 77px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    #content {
      .lead {
        height: 113px;
      }
    }
  }
  @media screen and (max-width: 400px) {
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

  $slide-distance: .2rem;
  $slide-opacity: .1;
  $route-transition-duration: .2s;

  .fade-enter-active, .fade-leave-active, .slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active {
    transition: all $route-transition-duration ease-out;
    min-height: calc(100vh - 5rem);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
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
</style>