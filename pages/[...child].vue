<script setup>
import {useClient} from "../composables/useClient";
import {useCrumbs} from "../composables/useCrumbs";
import {useInfo} from "../composables/useInfo";

definePageMeta({
  layout: 'app'
});

const client = useClient();

const params = useRoute().params;
const pathInfo = [];
let pathInc = '';
params.child.forEach((path) => {
  pathInc += '/' + path
  pathInfo.push({
    name: path,
    path: pathInc
  });
})
useCrumbs().set(pathInfo);
const path = params.child.join('/');

const { data: info } = await useInfo(path)
</script>
<template>
  <div>
    <nuxt-page :info="info" />
  </div>
</template>

<style scoped>
</style>