<template>
  <div id="home">
    <div class="container">
      <h1 class="display-3 display">Burger Loop</h1>
      <p class="lead text-black-50">Lerne, wie man mit pr<code>0</code>grammen Burger zum Braten bringt und dabei komplizierte Probleme löst.</p>
      <hr class="mb-5">
      <div class="row">
        <div class="col-12">
          <h2>Leg jetzt los:</h2>
          <p class="mb-5">Schau es dir im Detail an!</p>
          <b-button variant="primary" class="mb-4" to="/if">Starte mit If-Anweisungen</b-button>
        </div>
        <div class="nav-button next d-none d-md-block">
          <router-link :to="nextRoute">
            <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#aaa" d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"></path></svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BButton from "bootstrap-vue/src/components/button/button";
  export default {
    name: 'home',
      components: {BButton},
      data() {
          return {
              routes: ['/if', '/while', '/do-while', '/for', '/foreach']
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
          }
      }
  }
</script>

<style lang="scss" scoped>
  .row {
    position: relative;
  }
  .nav-button {
    position: absolute;
    top: .1rem;
    width: 1rem;
    height: 1rem;

    &.prev {
      left: -1rem;
    }
    &.next {
      right: -1rem;
    }
  }

  .lead {
    margin-bottom: calc(1.5rem + 2px);
  }
  @media screen and (max-width: 991px) {
    .display {
      font-size: 4.4rem;
    }
    .lead {
      height: auto !important;
      margin-bottom: calc(3rem - 2px);
    }
  }
  @media screen and (max-width: 768px) {

  }
  @media screen and (max-width: 576px) {
    .display {
      font-size: 3rem;
      font-weight: 600;
    }
    .lead {
      height: 90px !important;
      font-weight: 400;
    }
  }
</style>