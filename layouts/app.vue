<script setup>
import {useCrumbs} from "../composables/useCrumbs";
const crumbs = useCrumbs().get();
</script>

<template>
  <div class="container mt-4">
    <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div class="flex-1 px-2 mx-2">
        <nuxt-link class="text-lg font-bold" to="/">
          GitBear
        </nuxt-link>
        <span v-for="crumb in crumbs" class="ml-4">
          <span>/</span> <nuxt-link :to="crumb.path">{{ crumb.name }}</nuxt-link>
        </span>
      </div>
    </div>
    <div class="mt-8">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>