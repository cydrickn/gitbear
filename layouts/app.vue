<script setup>
import {useCrumbsItems} from "../composables/useCrumbsItems";
useMeta({
  title: 'GitBear'
})

const crumbs = await useCrumbsItems();
</script>

<template>
  <div class="container my-4">
    <div class="navbar mb-2 shadow-lg bg-primary text-primary-content rounded-box">
      <div class="flex-1 px-2 mx-2">
        <nuxt-link class="text-lg font-bold" to="/">
          GitBear
        </nuxt-link>
        <div v-if="crumbs" class="breadcrumbs ml-4">
          <ul>
            <li v-for="(crumb, key) in crumbs" :key="key">
              <nuxt-link :to="crumb.path">{{ crumb.name }}</nuxt-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="mt-8">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>