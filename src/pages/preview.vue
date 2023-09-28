<template>
  <main class="main">
    <div class="container">
      <div v-if="keys > 0">
        <h2>Персональные данные</h2>
        <div class="user__info">
          <span>{{ user.name }}, </span>
          <span>{{ setAge(user.age) }}</span>
        </div>
        <div class="user__children-info">
          <h2>Дети</h2>
          <ul class="user__children-list" v-if="user.children.length > 0">
            <li class="user__child" v-for="child in user.children">
              <span>{{ child.name }}, </span>
              <span>{{ setAge(child.age) }}</span>
            </li>
          </ul>
          <div v-else class="user__no-children">
            Детей нет или информация о детях не указана
          </div>
        </div>
      </div>
      <div v-else>
        Заполните информацию в форме
        <router-link class="go-to-home" :to="{name: 'home'}">Перейти к заполнению</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PreviewPage',
  computed: {
    user() {
      return this.$store.getters['getUser'];
    },
    keys() {
      return Object.keys(this.user).length;
    },
  },
  methods: {
    setAge(value) {
      if (String(value).endsWith('1')) return value + ' год';
      if (String(value).endsWith('2') || String(value).endsWith('3') || String(value).endsWith('4')) return value + ' года';
      else return value + ' лет';
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 30px;
}

.main {
  margin-top: 30px;
}

.container {
  max-width: calc(616px + 180px);
}

.go-to-home {
  color: #01A7FD;
}

.user__info,
.user__child,
.user__no-children {
  color: #111;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}

.user__info {
  margin-bottom: 30px;
}

.user__children-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user__child, .user__no-children {
  border-radius: 5px;
  background-color: #F1F1F1;
  padding: 10px 20px;
}
</style>