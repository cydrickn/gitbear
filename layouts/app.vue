<script setup>
import {useCrumbs} from "../composables/useCrumbs";
import {useInfo} from "../composables/useInfo";
import {useUtils} from "../composables/useUtils";

const params = useRoute().params;
const path = params.child.join('/');
const info = await useInfo(path);

const crumbs = useUtils().splitPath(info.path);
</script>

<template>
  <div class="container mt-4">
    <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div class="flex-1 px-2 mx-2">
        <nuxt-link class="text-lg font-bold" to="/">
          GitBear
        </nuxt-link>
        <div v-for="(crumb, key) in crumbs" class="ml-4" :key="key">
          <span>/</span>
          <nuxt-link :to="crumb.path">{{ crumb.name }}</nuxt-link>
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