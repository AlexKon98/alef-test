<template>
  <div class="wrap">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<style lang="scss">
@import '@/assets/styles/style.scss';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Montserrat', sans-serif;
}

ul, ol {
  list-style: none;
}

a {
  text-decoration: none;
}

input {
  outline: none;
  &:focus,
  &:active,
  &:focus-visible,
  &:focus-within,
  &:hover {
    outline: none;
  }
}

h2 {
  color: #111;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}

.container {
  max-width: 1920px;
  padding: 0 90px;
  margin: 0 auto;
}
</style>
