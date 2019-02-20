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

  h1 code {
    color: #F92672 !important;
  }

  .btn:disabled, .btn[disabled], .btn.disabled {
    opacity: .3 !important;
  }
  * > .tooltip.show {
    transition: opacity .15s;

    &:hover {
      opacity: 0 !important;
    }
  }

  @media screen and (max-width: 991px) {
    #navbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 7;
    }
    #content {
      margin-top: 3.5rem;
      margin-bottom: 5rem;

      .lead {
        height: 30px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    #content {
      margin-top: 2rem;
      margin-bottom: 3.5rem;

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
</style>