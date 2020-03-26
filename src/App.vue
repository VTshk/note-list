<template>
  <div id="app">
    <Toolbar />
    <router-view />
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue';

export default {
  components: {
    Toolbar,
  },
};
</script>

<style lang="sass">
body
  background: #dedede
  margin: 0
#app
  font-family: 'Roboto', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #4a4a4a

hr
  border: 0
  margin-top: 0
  height: 1px
  margin: 12px 0
  background-color: #dddddd

h1, h2
  margin: 0

i
  font-size: 24px
  cursor: pointer
  transition: 0.3s
  &:hover
    background: #dedede
    border-radius: 50%

button
  background: white
  border: 1px solid #a9a9a9
  cursor: pointer
  border-radius: 3px
  min-height: 30px
  transition: 0.3s
  &:hover
    background: #dedede

input
  border: 1px solid #a9a9a9
  border-radius: 3px
  height: 25px
  padding: 0 6px
</style>
