<template>
  <footer class="footer">
    <div class="container">
      <!-- Вообще эту часть обычно делают ссылкой, но т.к. ссылки нет - сделаю просто дивом -->
      <div class="footer__rights">
        all rights reserved
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer{
  padding: 30px 0;
  background: #FAFAFA;
  box-shadow: 0px 1px 0px 0px rgba(17, 17, 17, 0.10);
  margin-top: auto;
  .container {
    display: flex;
    justify-content: center;
  }
  &__rights {
    margin: 0 auto;
  }
}
</style>