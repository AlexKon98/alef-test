<template>
  <main class="main">
    <div v-if="show" class="response">
      <div class="response__text">Информация сохранена</div>
    </div>

    <div class="container">
      <h2>Персональные данные</h2>
      <form @submit.prevent class="user__form">

        <div class="user__info">
          <label class="user__label" for="name" :class="{'alarm': error.name}">
            <span>Имя</span>
            <input
              type="text"
              id="name"
              name="name"
              v-model="name"
            >
          </label>
          <label class="user__label" for="name" :class="{'alarm': error.age}">
            <span>Возраст</span>
            <input
              type="text"
              id="name"
              name="name"
              v-model="age"
            >
          </label>
        </div>

        <div class="user__children">

          <div class="user__children-wrap">
            <h2>Дети (макс. 5)</h2>
            <button v-if="children.length < 5" @click="addChild" class="user__add-child">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="24px / plus">
                  <path id="Union" fill-rule="evenodd" clip-rule="evenodd" d="M5.13332 10.8556C4.50125 10.8555 3.98887 11.3679 3.98887 12C3.98887 12.6321 4.50126 13.1445 5.13332 13.1445L10.8554 13.1445L10.8554 18.8668C10.8554 19.4989 11.3678 20.0113 11.9999 20.0113C12.632 20.0113 13.1444 19.4989 13.1444 18.8668L13.1443 13.1445L18.8667 13.1445C19.4988 13.1445 20.0112 12.6321 20.0112 12C20.0112 11.3679 19.4988 10.8556 18.8667 10.8556L13.1443 10.8556L13.1443 5.13338C13.1443 4.50132 12.632 3.98893 11.9999 3.98893C11.3678 3.98893 10.8554 4.50131 10.8554 5.13338L10.8554 10.8556L5.13332 10.8556Z" fill="#01A7FD"/>
                </g>
              </svg>
              <span>Добавить ребенка</span>
            </button>
          </div>

          <ul class="user__children-list" v-if="children.length > 0">
            <li class="user__children-item" v-for="(child, i) in children" :key="i">
              <label class="user__label" :for="'kid-name-' + i" :class="{'alarm' : child.alarm.name}">
                <span>Имя</span>
                <input type="text" v-model="child.name" :id="'kid-name-' + i" @blur="checkChildInputs(child, 'name')">
              </label>
              <label class="user__label" :for="'kid-age-' + i" :class="{'alarm' : child.alarm.age}">
                <span>Возраст</span>
                <input type="text" v-model="child.age" :id="'kid-age-' + i" @blur="checkChildInputs(child, 'age')">
              </label>
              <button class="user__child-delete" @click="deleteChild(child.id)">Удалить</button>
            </li>
          </ul>

          <button @click="saveForm" class="user__save">Сохранить</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      show: false,
      name: '',
      age: '',
      children: [],
      error: {
        name: false,
        age: false,
      },
      ready: false,
    }
  },
  watch: {
    name(v) {
      if (v.trim().length > 0) {
        if (/[0-9!@)(}{*_+=&?%$:;'"`<^>|/).,]/.test(v)) this.error.name = true;
        else this.error.name = false;
      }
    },
    age(v) {
      if (v.trim().length > 0) {
        if (/[a-zA-Zа-яА-Я!-+=_)/|(*&?:;"%$#№<^>'.,`\-]/.test(v)) this.error.age = true;
        else this.error.age = false;
      }
    }
  },
  methods: {
    checkNameValue(value) {
      return /[0-9!@)(}{*_+=&?%$:;'"`<^>|/).,]/.test(value);
    },
    checkAgeValue(value) {
      return /[a-zA-Zа-яА-Я!-+=_)/|(*&?:;"%$#№<^>'.,`\-]/.test(value);
    },
    errorName(val) {
      this.error.name = val;
    },
    errorAge(val) {
      this.error.age = val;
    },
    deleteChild(id) {
      this.children.forEach((child, index) => {
        if (child.id === id) this.children.splice(index, 1);
      });
    },
    addChild() {
      if ((this.children.length > 0 && this.children[this.children.length - 1].name !== '')
      ||
      this.children.length === 0) {
        this.children.push({name: '', age: '', alarm: {name: false, age: false}, id: this.children.length});
      }
    },
    checkChildInputs(child, val) {
      if (val === 'name') {
        if (!this.checkNameValue(child.name) && child.name.trim() !== '') child.alarm.name = false;
        else child.alarm.name = true;
      }

      if (val === 'age') {
        if (!this.checkAgeValue(child.age) && child.age.trim() !== '') child.alarm.age = false;
        else child.alarm.age = true;
      }
    },
    saveForm() {
      if (this.name.trim() === '') this.error.name = true;
      else this.error.name = false;
      if (this.age.trim() === '') this.error.age = true;
      else this.error.age = false;

      if (this.children.length === 0 && !this.error.age && !this.error.name) this.ready = true;
      else {
        if (this.children.length > 0) {
          this.children.forEach((child) => {
            if (!this.checkAgeValue(child.age) && child.age.trim() !== '') child.alarm.age = false;
            else child.alarm.age = true;

            if (!this.checkNameValue(child.name) && child.name.trim() !== '') child.alarm.name = false;
            else child.alarm.name = true;
          });

          if (this.children.some(child => child.alarm.name || child.alarm.age)) this.ready = false;
          else this.ready = true;
        }
      }
      if (this.ready) {
        this.show = true;
        this.$store.commit('setUser', { name: this.name, age: this.age, children: this.children });
        setTimeout(() => this.show = false, 1500);
      }
    },
  },
  mounted() {
    const user = { ...this.$store.getters['getUser'] };
    if (user.age && user.name && user.children) {
      this.age = user.age;
      this.name = user.name;
      this.children = user.children;
    }
  }
}
</script>

<style lang="scss" scoped>
.response {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #01A7FD;
  padding: 30px 50px;
  &__text {
    color: #01A7FD;
  }
}

.main {
  margin: 30px 0;
}

.container {
  max-width: calc(616px + 180px);
}

.user__form,
.user__label,
.user__info {
  display: flex;
  flex-direction: column;
}

.user__info {
  gap: 10px 0;
  margin: 20px 0 33px;
}

.user__label {
  padding: 8px 16px 6px;
  border-radius: 4px;
  border: 1px solid #F1F1F1;
  position: relative;
  span {
    display: block;
    margin-bottom: 2px;
    color: rgba(17, 17, 17, 0.48);
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  input {
    color: #111;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
}

.error {
  position: absolute;
  right: 5px;
  top: 5px;
  color: red;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.user__children-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 11px;
}

.user__add-child {
  border-radius: 100px;
  border: 2px solid #01A7FD;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 0 4px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #01A7FD;
    border-radius: 100px;
    transform: translateY(100%);
    transition: transform .2s linear;
  }
  &:hover::before {
    transform: none
  }
  span {
    color: #01A7FD;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    transition: color .2s linear;
  }
  span, svg {
    position: relative;
    z-index: 1;
  }
  svg path {
    transition: fill .2s linear;
  }
  &:hover span {
    color: #fff;
  }
  &:hover svg path {
    fill: #fff;
  }
}

.user__children-item {
  display: flex;
  align-items: center;
  gap: 0 18px;
}

.user__children-list {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin-bottom: 30px;
}

.user__child-delete {
  border: none;
  background-color: transparent;
  color: #01A7FD;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
}

.user__save {
  border-radius: 100px;
  background: #01A7FD;
  border: none;
  padding: 10px 20px;
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: opacity .2s linear;
  cursor: pointer;
  &:hover {
    opacity: .75;
  }
}

.user__label.alarm {
  border-color: red;
}
</style>