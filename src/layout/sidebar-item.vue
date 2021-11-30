<template>
  <fragment v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <router-link :to="resolvePath(item.path)">
        <el-menu-item :index="item.path" :key="item.path">
          <i v-if="item.meta.icon" :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)" :popper-append-to-body="true">
      <template slot="title">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </fragment>
</template>

<script>
import path from 'path'

export default {
  name: "SidebarItem",
  // components: {Item},
  // mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // if (showingChildren.length === 1) {
      //   return true
      // }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped>
/*解决收缩菜单栏文字不隐藏 （方案一）*/
.el-menu--collapse  .el-submenu__title span {
  display: none;
}
.el-menu-collapse  .el-submenu__title .el-submenu__icon-arrow{
  display: none;
}
/*解决收缩菜单栏文字不隐藏 （方案二）： 使用fragment标签替换div*/
</style>