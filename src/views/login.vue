<template>
  <div class="login-container">
    <el-form
        :model="loginForm"
        status-icon
        ref="loginForm"
        label-width="100px"
        class="login-form"
    >
      <div class="title-container">
        <h3 class="title" style="margin: 0 auto 40px auto">Vue 学习系统</h3>
      </div>
      <el-form-item label="用户名" prop="username" size="mini">
        <el-input type="username" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass" size="mini">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm" size="mini" style="width: 20%">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
      }
    }
  },
  methods: {
    submitForm() {
    },
  }
}
</script>

<style scoped>
.login-container {
  background: #42b983;
  height: 100%;
}

.el-input {
  width: 200px;
}

.login-form {
  position: relative;
  width: 450px;
  max-width: 100%;
  padding: 160px 20px 0;
  margin: 0 auto;
  overflow: hidden;
}

</style>