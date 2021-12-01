<template>
  <div>
    <label>
      <input v-model="inputValue" />
    </label>
  </div>
</template>

<script>
export default {
  name: "test2",
  data() {
    return {
      inputValue:'',
    }
  }
}
</script>

<style scoped>
</style>