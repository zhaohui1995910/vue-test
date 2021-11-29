<template>
  <div class="layout">
    <el-container style="height: 100%">
      <!--导航栏-->
      <el-aside style="background-color: rgb(238, 241, 246);width: 300px">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <SidebarItem v-for="route in asyncRoutes" :key="route.path" :item="route" />
        </el-menu>
      </el-aside>

      <el-container>
        <!--top栏-->
        <el-header style="text-align: right; font-size: 12px;background:bisque">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ user.name }}</span>
        </el-header>

        <!--内容栏-->
        <el-main style="background: #42b983">
          这是内容
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {verify_toekn} from "@/api/user"
import {getToken, setToken} from '@/utils/auth'
import SidebarItem from './sidebar-item'

export default {
  name: "Layout",
  components: {SidebarItem},
  data() {
    return {
      asyncRoutes: [],
      openMenu: [],
      itmer: undefined,
      user: {
        name: 'zzz',
        roles: [],
      }
    }
  },
  created() {
    // 获取用户信息
    this.$store.dispatch('user/getInfo').then(
        (userInfo) => {
          this.user = userInfo
          // # 获取动态路由
          this.$store.dispatch('permission/generateRoutes', this.$store.getters.roles).then(
              (asyncRoutes) => {
                this.asyncRoutes = asyncRoutes
              }
          )
        }
    )
    // 挂载动态路由
    this.$router.addRoutes(this.asyncRoutes)
    console.log('router', this.$router)
  },
  methods: {},
  mounted() {
    // 设置验证token定时器
    this.itmer = setInterval(() => {
      verify_toekn({token: getToken()}).then(
          response => {
            console.log('定时器，验证token')
            const {message} = response
            if (!message.result) {
              setToken(null)
            }
          }
      )
    }, 100 * 1000)

  },
  beforeDestroy() {
    clearInterval(this.itmer)
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
}
</style>