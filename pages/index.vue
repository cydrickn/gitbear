<script setup>
const client = useClient();
const { data: children } = await useAsyncData('children', () => client('/api/children'));
</script>

<template>
  <div class="container">
    <div>Groups and Projects</div>
    <div>
      <ul>
        <li v-for="(child, key) in children" :key="key">
          <NuxtLink :to="child.path">{{ child.name }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>