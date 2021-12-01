<template>
  <div class="sidebar-logo-container">
    <transition>
      <router-link to="/">
        <img v-if="logoState" :src="logo" alt="" class="sidebar-logo">
        <h1 v-if="titleState" class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: ["logoState", "titleState"],
  data() {
    return {
      title: 'Vue Test',
      logo: require('../assets/logo.png')
    }
  }
}
</script>

<style scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 50px;
  background: sandybrown;
  text-align: center;
  overflow: hidden;
}

.sidebar-logo {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

.sidebar-title {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 560;
  line-height: 50px;
  font-size: 12px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
  margin-right: 45px;
  margin-left: 10px;
}

</style>