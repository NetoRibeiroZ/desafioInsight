<template>
  <div id="app">
    <searchComponent/>
  </div>
</template>

<script>
import searchComponent from './components/searchComponent.vue'

export default {
  name: 'App',
  components: {
    searchComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
