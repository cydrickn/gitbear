<script setup>
import {useCrumbs} from "../composables/useCrumbs";
definePageMeta({
  layout: 'app'
});

useCrumbs().set();
</script>
<template>
  <div>
    <nuxt-page />
  </div>
</template>

<style scoped>
</style>