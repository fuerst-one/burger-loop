<template>
  <div id="home">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-8">
          <b-jumbotron header="Burger-Loop" lead="Lerne, wie man mit Programmen Burger zum Braten bringt und dabei komplizierte Probleme löst.">
            <p>Schau es dir im Detail an:</p>
            <b-button variant="primary" class="mr-2" to="/if">Starte mit If-Anweisungen!</b-button>
          </b-jumbotron>
        </div>
        <div class="col-md-4">
          <img src="../assets/img/burger/burger.svg" alt="" class="img-fluid mx-auto" width="300px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {}
  }
</script>

<style lang="scss" scoped>
</style>
