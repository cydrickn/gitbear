<script setup>
import {useCrumbs} from "../composables/useCrumbs";
import {useInfo} from "../composables/useInfo";
definePageMeta({
  layout: 'app'
});

const info = await useInfo();

useMeta({
  title: info.name + ' | GitBear'
})

useCrumbs().set();
</script>
<template>
  <div>
    <nuxt-page />
  </div>
</template>

<style scoped>
</style>