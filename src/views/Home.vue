<template>
  <div id="home">
    <div class="container">
      <h1 class="display-3">Burger-Loop</h1>
      <p class="lead mb-4">Lerne, wie man mit Programmen Burger zum Braten bringt und dabei komplizierte Probleme löst.</p>
      <hr class="mb-5">
      <h2>Leg jetzt los:</h2>
      <p>Schau es dir im Detail an!</p>
      <b-button variant="primary" class="mr-2" to="/if">Starte mit If-Anweisungen</b-button>
    </div>
  </div>
</template>

<script>
  import BButton from "bootstrap-vue/src/components/button/button";
  export default {
    name: 'home',
      components: {BButton},
  }
</script>