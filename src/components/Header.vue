<template>
  <header class="header">
    <div class="container">
      <router-link :to="'/'">
        <img src="@/assets/imgs/logo-header.svg" alt="">
      </router-link>
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__item">
            <router-link class="header__link" :to="{name: 'home'}">Форма</router-link>
          </li>
          <li class="header__item">
            <router-link class="header__link" :to="{name: 'preview'}">Превью</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
.header {
  padding: 22px 0;
  border-bottom: 1px solid rgba(17, 17, 17, 0.10);;
  .container {
    display: flex;
    align-items: center;
  }
  &__nav {
    margin: 0 auto;
  }
  &__list {
    display: flex;
    gap: 0 24px;
  }
  &__link {
    color: rgba(17, 17, 17, 0.48);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>