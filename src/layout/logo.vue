<template>
  <div class="sidebar-logo-container">
    <transition>
      <router-link to="/">
        <img :src="logo" alt="" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Logo",
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
  margin-right: 10px;
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
}

</style>