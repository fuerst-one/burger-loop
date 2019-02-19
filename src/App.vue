<template>
  <div id="app">
    <Navbar></Navbar>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    export default {
        components: {Navbar}
    }
</script>

<style lang="scss">
  #content {
    margin-top: 4rem;
  }

  .btn:disabled, .btn[disabled], .btn.disabled {
    opacity: .3 !important;
  }

  @media screen and (max-width: 991px) {
    #navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 7;
    }
    #content {
      margin-top: 7rem;
    }
  }
  @media screen and (max-width: 576px) {
    #content {
      margin-top: 5rem;
    }
  }

  * {
    font-smooth: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>