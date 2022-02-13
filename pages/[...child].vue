<script setup>
import {useClient} from "../composables/useClient";
const client = useClient();

const params = useRoute().params;
const path = params.child.join('/');
const { data: info } = await useAsyncData('info-' + path, () => client('/api/info', { params: { path } }));
</script>
<template>
  <div>
    <div>{{ info.name }}</div>
    <nuxt-page :info="info" />
  </div>
</template>

<style scoped>
</style>