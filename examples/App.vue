<template>
  <div id="app">
    <div class="main">
      <c-progress :percent.sync="percent" is-change/>
      <c-progress :percent.sync="percent" progress-color="skyblue" solid-color="white"/>
      <c-progress :percent.sync="percent" is-show-percent/>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      percent: 0
    }
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
.main {
  width: 500px;
  height: 400px;
  margin: 0 auto;
  background-color: rgb(216, 216, 216);
  
}
</style>
