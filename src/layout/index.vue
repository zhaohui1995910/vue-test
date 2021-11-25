<template>
  <div class="layout">
    <el-container style="height: 100%">

      <el-aside style="background-color: rgb(238, 241, 246);width: 300px">

        <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
          <el-submenu v-for="item in asyncRoutes" :index="item.path" :key="item.path">

            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>

            <template v-for="two in item.children">
              <template v-if="two.children">
                <el-submenu :index="two.path" :key="two.path">
                  <template slot="title">{{ two.title }}</template>
                  <!--三级菜单-->
                  <el-menu-item v-for="three in two.children" :index="three.path" :key="three.path">
                    {{ three.title }}
                  </el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="two.path" :key="two.path">{{ two.title }}</el-menu-item>
              </template>
            </template>


          </el-submenu>

        </el-menu>
      </el-aside>


      <el-container>
        <el-header style="text-align: right; font-size: 12px;background:bisque">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>管理员</span>
        </el-header>

        <el-main style="background: #42b983">
          这是内容
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      asyncRoutes: [
        {
          title: '导航一',
          path: '/daohang1',
          children: [
            {
              path: 'xx1',
              title: '选项1',
              children: [
                {
                  path: 'xxx1',
                  title: 'xxx1',
                },
                {
                  path: 'xxx2',
                  title: 'xxx2',
                }
              ]
            },
            {
              path: 'xx2',
              title: '选项1'
            },
            {
              path: 'xx3',
              title: '选项1'
            },
          ]
        },
        {
          title: '导航二',
          path: '/daohang2',
          children: [
            {
              path: 'xy1',
              title: '选项一',
              children: [
                {
                  path: 'xxx3',
                  title: 'xxx3',
                }
              ]
            },
            {
              path: 'xy2',
              title: '选项二'
            },
            {
              path: 'xy3',
              title: '选项三'
            },
          ]
        },
        {
          title: '导航三',
          path: '/daohang3',
          children: [
            {
              path: 'xx1',
              title: '选项1'
            }
          ]
        },
      ],
      openMenu: []
    }
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
}
</style>