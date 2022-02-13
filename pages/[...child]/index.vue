<script setup>
defineProps({
  info: Object
})
</script>

<template>
  <div>
    <div v-if="info.type === 'group'">
      <div>SubGroups and Projects</div>
      <ul>
        <li v-for="(child, key) in info.children" :key="key">
          <NuxtLink :to="child.path">{{ child.name }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>

    </div>
  </div>
</template>

<style scoped>

</style>