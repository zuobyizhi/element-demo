<template>
  <div id="app">
    <app-header></app-header>
		<div id='content'>
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
import appHeader from './components/header.vue'
export default {
  name: 'app',
  components: {
    appHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#content {
  margin-top: 60px;
}
</style>
