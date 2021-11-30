<template>
  <div class="layout">
    <el-container style="height: 100%">
      <!--导航栏-->
      <el-scrollbar style="background-color: rgb(238, 241, 246);width: 250px">
        <logo/>
        <el-menu
            class="el-menu--vertical"
            :collapse="isCollapse"
            mode="vertical"
        >
          <SidebarItem v-for="route in asyncRoutes" :key="route.path" :item="route"/>
        </el-menu>
      </el-scrollbar>

      <el-container>

        <!--top栏-->
        <el-header style="text-align: right; font-size: 12px;background:bisque">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
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
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import {verify_toekn} from "@/api/user"
import {getToken, setToken} from '@/utils/auth'
import SidebarItem from './sidebar-item'
import Logo from './logo'
// import variables from '@/styles/variables.scss'

export default {
  name: "Layout",
  components: {Logo, SidebarItem},
  data() {
    return {
      asyncRoutes: this.$store.getters.asyncRoutes,
      openMenu: [],
      itmer: undefined,
      user: {
        name: this.$store.getters.name,
        roles: this.$store.getters.roles,
      },
      isCollapse: true,
    }
  },
  created() {
    // 获取用户信息
    // 如果挂载动态路由只写在这里，点击刷新会重置router导致找不到页面，所以还是写在路由守卫中
    // this.$store.dispatch('user/getInfo').then(
    //     (userInfo) => {
    //       this.user = userInfo
    //       // # 获取动态路由
    //       this.$store.dispatch('permission/generateRoutes', this.$store.getters.roles).then(
    //           (asyncRoutes) => {
    //             // 挂载动态路由
    //             console.log('挂载动态路由', asyncRoutes)
    //             this.asyncRoutes = asyncRoutes
    //             router.addRoutes(this.asyncRoutes)
    //             console.log(router)
    //           }
    //       )
    //     }
    // )
    // 挂载动态路由
    // router.addRoutes(this.asyncRoutes)
  },
  computed: {
    // variables() {
    //   return variables
    // },
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
      ).catch(
          error => {
            console.log('layout请求验证token失败',error)
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