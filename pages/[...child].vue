<script setup>
import {useClient} from "../composables/useClient";
import {useCrumbs} from "../composables/useCrumbs";
import {useInfo} from "../composables/useInfo";

definePageMeta({
  layout: 'app'
});
const params = useRoute().params;
const path = params.child.join('/');

const info = await useInfo(path);
</script>
<template>
  <div>
    <nuxt-page />
  </div>
</template>

<style scoped>
</style>