<template>
  <div v-if="!item.hidden">
    <el-menu-item
        v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow"
        :index="item.path"
        :key="item.path"
    >
      <i v-if="item.meta.icon" :class="item.meta.icon"></i>
      <span slot="title">{{ onlyOneChild.meta.title }}</span>
    </el-menu-item>

    <el-submenu v-else :index="item.path" :key="item.path">
      <template slot="title">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        {{ item.meta.title }}
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
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
  }
}
</script>

<style scoped>

</style>