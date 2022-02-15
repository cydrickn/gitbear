<script setup>
import {useClient} from "../composables/useClient";
import {useCrumbs} from "../composables/useCrumbs";
import {useInfo} from "../composables/useInfo";
import {useUtils} from "../composables/useUtils";
const utils = useUtils();

definePageMeta({
  layout: 'app'
});
const params = useRoute().params;
const path = params.child.join('/');
const info = await useInfo(path);

useCrumbs().set(utils.splitPath(info.value.path));
</script>
<template>
  <div>
    <nuxt-page />
  </div>
</template>

<style scoped>
</style>