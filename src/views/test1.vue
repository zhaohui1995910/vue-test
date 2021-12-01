<template>
  <div>
    <label>
      <input v-model="inputValue" />
    </label>
  </div>
</template>

<script>
export default {
  name: "test1",
  data() {
    return {
      inputValue:'',
    }
  }
}
</script>

<style scoped>
</style>