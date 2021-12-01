<template>
  <div class="layout">
    <el-container style="height: 100%">
      <!--导航栏-->
      <el-aside style="background-color: rgb(238, 241, 246)" :style="aside_width">
        <!--LOGO栏-->
        <logo :logo-state="logoState.logo" :title-state="logoState.title"/>
        <!--导航菜单栏-->
        <el-menu
            class="el-menu--vertical"
            :collapse="isCollapse"
            mode="vertical"
        >
          <SidebarItem v-for="route in asyncRoutes" :key="route.path" :item="route"/>
        </el-menu>
      </el-aside>
      <el-container>
        <!--top栏-->
        <el-header>
          <Hamburger class="hamburger-container" @toggleClick="toggleSideBar"/>
          <el-dropdown style="height: 100%">
            <img class="user-avatar" :src="require('../assets/tx.png')" alt="头像"/>
            <i class="el-icon-setting" style="margin-right: 15px;visibility:hidden"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!--内容栏-->
        <el-main>
          <keep-alive :include="cacheView">
            <router-view/>
          </keep-alive>
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
import Hamburger from '@/components/Hamburger'

export default {
  name: "Layout",
  components: {Logo, SidebarItem, Hamburger},
  data() {
    return {
      asyncRoutes: this.$store.getters.asyncRoutes,
      allRoutes: this.$store.getters.routes,
      cacheView: [],
      openMenu: [],
      itmer: undefined,
      user: {
        name: this.$store.getters.name,
        roles: this.$store.getters.roles,
      },
      isCollapse: false,
      logoState: {
        logo: true,
        title: true,
      },
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
    aside_width() {
      // if (!this.isCollapse) {
      //   return {width: '250px'}
      // } else {
      //   return {width: '64px'}
      // }

      return !this.isCollapse ? {width: '250px'} : {width: '65px'}
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    filterCacheView(routes) {
      let view = []
      routes.forEach(route => {
        if (route.name && route.meta && route.meta.cache) {
          view.push(route.name)
        }
        if (route.children) {
          const tempView = this.filterCacheView(route.children)
          view = [...view, ...tempView]
        }
      })
      return view
    },
    initCacheView() {
      this.cacheView = this.filterCacheView(this.allRoutes)
    }
  },
  mounted() {
    // 配置哪些组件缓存
    this.initCacheView()
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
            console.log('layout请求验证token失败', error)
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

.el-header {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}

.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  padding-top: 10px;
}

.el-header {
  text-align: right;
  font-size: 12px;
  box-shadow: 0 0 10px #d0d0d0
}
</style>